// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title MediTrace
 * @notice Decentralized pharmaceutical supply chain custody verification protocol
 */
contract MediTrace {
    enum Status { Authentic, DuplicateAlert, Recalled, ThermalBreach }

    struct Checkpoint {
        string stage;
        string facility;
        string location;
        int256 temperatureCelsius;
        uint256 timestamp;
        address custodian;
    }

    struct Batch {
        string batchId;
        string name;
        string brand;
        string serialNumber;
        string ndc;
        uint256 manufactureDate;
        uint256 expiryDate;
        Status status;
        address manufacturer;
        uint256 scanCount;
        bool exists;
    }

    address public authority;
    mapping(string => Batch) public batches;
    mapping(string => Checkpoint[]) public custodyTrail;

    event BatchRegistered(string indexed serialNumber, string batchId, address indexed manufacturer);
    event CustodyRecorded(string indexed serialNumber, string facility, int256 temp);
    event AnomalyFlagged(string indexed serialNumber, address scanner);
    event BatchRecalled(string indexed serialNumber, string reason);

    modifier onlyAuthority() {
        require(msg.sender == authority, "Unauthorized");
        _;
    }

    constructor() {
        authority = msg.sender;
    }

    function registerBatch(
        string memory _serial,
        string memory _batchId,
        string memory _name,
        string memory _brand,
        string memory _ndc,
        uint256 _mfgDate,
        uint256 _expDate
    ) external {
        require(!batches[_serial].exists, "Batch already registered");

        batches[_serial] = Batch({
            batchId: _batchId,
            name: _name,
            brand: _brand,
            serialNumber: _serial,
            ndc: _ndc,
            manufactureDate: _mfgDate,
            expiryDate: _expDate,
            status: Status.Authentic,
            manufacturer: msg.sender,
            scanCount: 0,
            exists: true
        });

        custodyTrail[_serial].push(Checkpoint({
            stage: "Production Genesis",
            facility: _brand,
            location: "Authorized Manufacturing Plant",
            temperatureCelsius: 21,
            timestamp: block.timestamp,
            custodian: msg.sender
        }));

        emit BatchRegistered(_serial, _batchId, msg.sender);
    }

    function recordTransfer(
        string memory _serial,
        string memory _stage,
        string memory _facility,
        string memory _location,
        int256 _temp
    ) external {
        require(batches[_serial].exists, "Batch not found");

        if (_temp > 10 && batches[_serial].status == Status.Authentic) {
            batches[_serial].status = Status.ThermalBreach;
        }

        custodyTrail[_serial].push(Checkpoint({
            stage: _stage,
            facility: _facility,
            location: _location,
            temperatureCelsius: _temp,
            timestamp: block.timestamp,
            custodian: msg.sender
        }));

        emit CustodyRecorded(_serial, _facility, _temp);
    }

    function verifyBatch(string memory _serial) external returns (Batch memory, Checkpoint[] memory) {
        require(batches[_serial].exists, "Unregistered serial: Potential counterfeit");

        batches[_serial].scanCount += 1;

        if (batches[_serial].scanCount > 10 && batches[_serial].status == Status.Authentic) {
            batches[_serial].status = Status.DuplicateAlert;
            emit AnomalyFlagged(_serial, msg.sender);
        }

        return (batches[_serial], custodyTrail[_serial]);
    }

    function recallBatch(string memory _serial, string memory _reason) external onlyAuthority {
        require(batches[_serial].exists, "Batch not found");
        batches[_serial].status = Status.Recalled;
        emit BatchRecalled(_serial, _reason);
    }
}
