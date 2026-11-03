// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title MediTrace — Anti-Counterfeit Pharmaceutical Verification Protocol
 * @notice Decentralized supply-chain custody and serialized authentication on EVM
 */
contract MediTrace {
    enum BatchStatus { AUTHENTIC, SUSPICIOUS_DUPLICATE, RECALLED, COLD_CHAIN_BREACH }

    struct Checkpoint {
        string stage;
        string facility;
        string location;
        int256 temperatureCelsius;
        uint256 timestamp;
        address custodian;
        string txSignature;
    }

    struct MedicineBatch {
        string batchId;
        string name;
        string brand;
        string serialNumber;
        string ndc;
        uint256 manufactureDate;
        uint256 expiryDate;
        BatchStatus status;
        address manufacturer;
        uint256 scanCount;
        bool exists;
    }

    address public regulatoryAuthority;
    mapping(string => MedicineBatch) public batches; // serialNumber => Batch
    mapping(string => Checkpoint[]) public custodyTrail; // serialNumber => Checkpoints
    string[] public registeredSerialNumbers;

    event BatchMinted(string indexed serialNumber, string batchId, address indexed manufacturer, string name);
    event CustodyLogged(string indexed serialNumber, string facility, int256 temperatureCelsius, address indexed custodian);
    event DuplicateAlertTriggered(string indexed serialNumber, address indexed scannerNode, uint256 totalScans);
    event BatchRecalled(string indexed serialNumber, string reason, address indexed authority);

    modifier onlyAuthority() {
        require(msg.sender == regulatoryAuthority, "Only regulatory authority permitted");
        _;
    }

    constructor() {
        regulatoryAuthority = msg.sender;
    }

    /**
     * @notice Manufacturer mints a new serialized pharmaceutical batch
     */
    function registerBatch(
        string memory _serialNumber,
        string memory _batchId,
        string memory _name,
        string memory _brand,
        string memory _ndc,
        uint256 _mfgDate,
        uint256 _expDate
    ) external {
        require(!batches[_serialNumber].exists, "Serial already registered on-chain");

        batches[_serialNumber] = MedicineBatch({
            batchId: _batchId,
            name: _name,
            brand: _brand,
            serialNumber: _serialNumber,
            ndc: _ndc,
            manufactureDate: _mfgDate,
            expiryDate: _expDate,
            status: BatchStatus.AUTHENTIC,
            manufacturer: msg.sender,
            scanCount: 0,
            exists: true
        });

        registeredSerialNumbers.push(_serialNumber);

        custodyTrail[_serialNumber].push(Checkpoint({
            stage: "Manufacturing Genesis",
            facility: _brand,
            location: "Authorized Production Facility",
            temperatureCelsius: 21,
            timestamp: block.timestamp,
            custodian: msg.sender,
            txSignature: "ECDSA_GENESIS_SEAL"
        }));

        emit BatchMinted(_serialNumber, _batchId, msg.sender, _name);
    }

    /**
     * @notice Distributor or Logistics Node records a custody handover and temperature
     */
    function recordTransfer(
        string memory _serialNumber,
        string memory _stage,
        string memory _facility,
        string memory _location,
        int256 _tempCelsius,
        string memory _signature
    ) external {
        require(batches[_serialNumber].exists, "Batch not found on-chain");

        // Thermal excursion check (> 10°C triggers cold-chain breach)
        if (_tempCelsius > 10 && batches[_serialNumber].status == BatchStatus.AUTHENTIC) {
            batches[_serialNumber].status = BatchStatus.COLD_CHAIN_BREACH;
        }

        custodyTrail[_serialNumber].push(Checkpoint({
            stage: _stage,
            facility: _facility,
            location: _location,
            temperatureCelsius: _tempCelsius,
            timestamp: block.timestamp,
            custodian: msg.sender,
            txSignature: _signature
        }));

        emit CustodyLogged(_serialNumber, _facility, _tempCelsius, msg.sender);
    }

    /**
     * @notice Pharmacy or Patient scans QR code to verify
     */
    function verifyBatch(string memory _serialNumber) external returns (MedicineBatch memory, Checkpoint[] memory) {
        require(batches[_serialNumber].exists, "Unregistered serial: Potential Counterfeit");

        batches[_serialNumber].scanCount += 1;

        // Anomaly check: duplicate collision alert
        if (batches[_serialNumber].scanCount > 10 && batches[_serialNumber].status == BatchStatus.AUTHENTIC) {
            batches[_serialNumber].status = BatchStatus.SUSPICIOUS_DUPLICATE;
            emit DuplicateAlertTriggered(_serialNumber, msg.sender, batches[_serialNumber].scanCount);
        }

        return (batches[_serialNumber], custodyTrail[_serialNumber]);
    }

    /**
     * @notice Read-only batch query
     */
    function getBatch(string memory _serialNumber) external view returns (MedicineBatch memory, Checkpoint[] memory) {
        require(batches[_serialNumber].exists, "Batch does not exist");
        return (batches[_serialNumber], custodyTrail[_serialNumber]);
    }

    /**
     * @notice Regulatory authority triggers mandatory safety recall
     */
    function recallBatch(string memory _serialNumber, string memory _reason) external onlyAuthority {
        require(batches[_serialNumber].exists, "Batch not found");
        batches[_serialNumber].status = BatchStatus.RECALLED;
        emit BatchRecalled(_serialNumber, _reason, msg.sender);
    }

    function totalBatchesCount() external view returns (uint256) {
        return registeredSerialNumbers.length;
    }
}
