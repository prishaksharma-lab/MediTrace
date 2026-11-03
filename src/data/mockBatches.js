// MediTrace Comprehensive Mock Database

export const initialBatches = [
  {
    id: "MT-9921-AUTH",
    name: "Lipitor (Atorvastatin Calcium)",
    brand: "Pfizer Pharmaceuticals",
    dosage: "20 mg Film-Coated Tablets",
    ndc: "0069-4210-66",
    gtin: "00300694210668",
    batchNumber: "B9921-X",
    serialNumber: "SN-2024-9921-X7Q",
    status: "AUTHENTIC", // AUTHENTIC | SUSPICIOUS_DUPLICATE | RECALLED | COLD_CHAIN_BREACH
    manufactureDate: "2024-10-12",
    expiryDate: "2027-10-12",
    storageTemp: "20°C to 25°C (Excursions 15°C - 30°C)",
    currentTemp: "21.8°C",
    composition: "Atorvastatin Calcium Trihydrate 20mg, microcrystalline cellulose, lactose monohydrate, croscarmellose sodium",
    packageType: "Blister Pack (30 Tablets) with Tamper-Evident Micro-Hologram",
    authenticityScore: 99.8,
    scanCount: 1,
    verifiedAt: "Just now",
    manufacturerAddress: "Pfizer Biotech Global Center, Kalamazoo, MI, USA",
    currentLocation: "CVS Pharmacy #4829, Manhattan, NY",
    cryptoProof: {
      blockNumber: 819245,
      txHash: "0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
      merkleRoot: "0x4e2b9c7a10f8821d3e89a24177b856c9a9d2011fb571ea32a39a8c028e93214a",
      digitalSignature: "ECDSA-SECP256K1-VALID-0x9F44...A7B1",
      smartContract: "0x3e17B7A9e3158c8DbFe6c986Db214A3Fa0B29D55",
      consensus: "14/14 Validator Nodes Confirmed"
    },
    tamperChecklist: {
      sealIntegrity: true,
      hologramValid: true,
      hashMatched: true,
      custodyUnbroken: true,
      tempCompliant: true,
      noDuplicateScans: true
    },
    journey: [
      {
        id: "ev-1",
        stage: "Manufacturing & Serialization",
        title: "Batch Genesis & Cryptographic Sealing",
        facility: "Pfizer Biotech Campus - Plant 04",
        location: "Kalamazoo, MI, USA",
        timestamp: "2024-10-12 08:30 EST",
        status: "COMPLETED",
        authorizedBy: "Dr. Elena Vance (Lead Serialization Pharmacist)",
        did: "did:meditrace:mfg:pfizer:plant04",
        details: "Assay purity confirmed 99.8%. Batch serial numbers minted to MediTrace Smart Contract. Micro-holographic tags applied to carton blanks.",
        txHash: "0x1a89b...e4f1",
        block: 819001
      },
      {
        id: "ev-2",
        stage: "Quality Assurance & Regulatory Release",
        title: "FDA Regulatory Clearance & Lab Release",
        facility: "CDER Quality Verification Lab",
        location: "Silver Spring, MD, USA",
        timestamp: "2024-10-15 14:20 EST",
        status: "COMPLETED",
        authorizedBy: "FDA Automated Regulatory Node (Oracle)",
        did: "did:fda:cder:gov:validator-02",
        details: "Digital CoA (Certificate of Analysis) uploaded to IPFS. Identity hash verified against standard reference monograph. Release authorized for commercial distribution.",
        txHash: "0x3c91d...77a9",
        block: 819088
      },
      {
        id: "ev-3",
        stage: "Secure Logistics & Cold Chain",
        title: "McKesson National Logistics Transfer",
        facility: "McKesson Midwest Logistics Super-Hub",
        location: "Chicago, IL, USA",
        timestamp: "2024-10-19 11:45 CST",
        status: "COMPLETED",
        authorizedBy: "Marcus Thorne (Logistics Operations Lead)",
        did: "did:dist:mckesson:chicago:dock09",
        details: "Continuous temperature monitoring: Min 20.1°C, Max 22.4°C. Zero deviation during 48-hour secure freight transit. GPS telematics sealed.",
        txHash: "0x5d44a...bb12",
        block: 819142
      },
      {
        id: "ev-4",
        stage: "Pharmacy Dispensing Intake",
        title: "Retail Pharmacy Stock Verification",
        facility: "CVS Health Dispensary #4829",
        location: "Manhattan, NY, USA",
        timestamp: "2024-10-24 09:15 EDT",
        status: "COMPLETED",
        authorizedBy: "Sarah Lin, PharmD (Supervising Pharmacist)",
        did: "did:pharmacy:cvs:ny:license-99824",
        details: "Inbound 2D DataMatrix scanned. Cryptographic hash matched ledger. Box security tape inspected under UV light. Stocked in secure climate-controlled dispensary.",
        txHash: "0x7f83b...9069",
        block: 819245
      }
    ]
  },
  {
    id: "MT-8842-WARN",
    name: "Amoxicillin Trihydrate",
    brand: "Sandoz Generic Labs (Claimed)",
    dosage: "500 mg Hard Capsules",
    ndc: "0781-2613-05",
    gtin: "00307812613052",
    batchNumber: "B8842-F",
    serialNumber: "SN-2024-8842-F9K",
    status: "SUSPICIOUS_DUPLICATE",
    manufactureDate: "2024-09-05",
    expiryDate: "2026-09-05",
    storageTemp: "15°C to 25°C",
    currentTemp: "Unknown (Unregulated)",
    composition: "Label claims: Amoxicillin Trihydrate 500mg. Actual lab verification: Inconsistent excipients flagged.",
    packageType: "Bottle of 100 Capsules (Clone Packaging Detected)",
    authenticityScore: 12.4,
    scanCount: 14,
    verifiedAt: "Alert Triggered 6 mins ago",
    manufacturerAddress: "Claimed: Holzkirchen, Germany | Detected Origin: Gray Market / Clone Packaging",
    currentLocation: "Multiple Conflicting Locations (Mumbai & London)",
    cryptoProof: {
      blockNumber: 819210,
      txHash: "0xDEADBEEF...77194A3D",
      merkleRoot: "0x00000000...FAILED_INTEGRITY",
      digitalSignature: "INVALID_SIGNATURE_ORIGIN",
      smartContract: "0x3e17B7A9e3158c8DbFe6c986Db214A3Fa0B29D55",
      consensus: "ALERT: 14/14 Nodes Flagged Clone Breach"
    },
    tamperChecklist: {
      sealIntegrity: false,
      hologramValid: false,
      hashMatched: false,
      custodyUnbroken: false,
      tempCompliant: false,
      noDuplicateScans: false
    },
    anomalyDetails: {
      reason: "DUPLICATE SERIAL COLLISION & SIGNATURE MISMATCH",
      description: "This exact serial number (SN-2024-8842-F9K) was scanned 14 times within the last 48 hours across geographically disjoint hubs without authorized handover events.",
      collisionLocations: [
        { city: "Mumbai, India", store: "Apollo Pharmacy Sector 4", time: "14:15 UTC (Today)", ip: "103.24.88.x" },
        { city: "London, UK", store: "Boots Retail Dispense Oxford St", time: "14:32 UTC (Today)", ip: "82.165.12.x" },
        { city: "Lagos, Nigeria", store: "Unverified Wholesaler Checkpoint", time: "Yesterday 21:04 UTC", ip: "197.210.45.x" }
      ],
      recommendation: "CRITICAL SAFETY RISK: Do not dispense or ingest. Quarantine container. The packaging graphics show typography discrepancies typical of counterfeit replicas."
    },
    journey: [
      {
        id: "ev-w1",
        stage: "Manufacturing",
        title: "Legitimate Genesis (Cloned Target)",
        facility: "Sandoz Plant Kundl",
        location: "Kundl, Austria",
        timestamp: "2024-09-05 09:00 CET",
        status: "COMPLETED",
        authorizedBy: "Original Batch Token Minted",
        did: "did:meditrace:mfg:sandoz:plant01",
        details: "Original legitimate batch of 50,000 units minted. Serial number leaked or duplicated via barcode photo illicit replication.",
        txHash: "0x8912a...110b",
        block: 818450
      },
      {
        id: "ev-w2",
        stage: "Anomaly Detection",
        title: "Concurrent Duplicate Scan Alert",
        facility: "MediTrace Autonomous Sentinel Node",
        location: "Global Distributed Watchtower",
        timestamp: "Today 14:32 UTC",
        status: "FAILED",
        authorizedBy: "Automated Fraud Engine",
        did: "did:meditrace:sentinel:engine-09",
        details: "Impossible transit velocity: Distance 7,200 km traversed in 17 minutes. Cryptographic private seal rejected. Product flagged as high-risk counterfeit.",
        txHash: "0xDEADBEEF...7719",
        block: 819210
      }
    ]
  },
  {
    id: "MT-7719-RECL",
    name: "Pediatric Paracetamol Suspension",
    brand: "Apex Healthcare Ltd",
    dosage: "120 mg / 5 mL Oral Suspension (100ml)",
    ndc: "51655-214-52",
    gtin: "00351655214521",
    batchNumber: "B7719-R",
    serialNumber: "SN-2024-7719-R3A",
    status: "RECALLED",
    manufactureDate: "2024-03-10",
    expiryDate: "2025-03-10", // Imminent expiry
    storageTemp: "Below 25°C. Do not freeze.",
    currentTemp: "23.1°C",
    composition: "Paracetamol 120mg per 5ml, sucrose, methylparaben, strawberry flavor",
    packageType: "Amber Glass Bottle with Child-Resistant Cap",
    authenticityScore: 68.0,
    scanCount: 3,
    verifiedAt: "10 mins ago",
    manufacturerAddress: "Apex Pharma Industrial Estate, Hyderabad, India",
    currentLocation: "Apex Regional Distribution Depot",
    cryptoProof: {
      blockNumber: 819190,
      txHash: "0x98124bca881726aef19284ba102948bbca718293049182390192837461928374",
      merkleRoot: "0xcc817261552a4b81098234610928374615243109283746152431092837461524",
      digitalSignature: "VALID-MFR-KEY-WITH-RECALL-EVENT",
      smartContract: "0x3e17B7A9e3158c8DbFe6c986Db214A3Fa0B29D55",
      consensus: "14/14 Nodes Enforced Class I Recall Smart Lock"
    },
    tamperChecklist: {
      sealIntegrity: true,
      hologramValid: true,
      hashMatched: true,
      custodyUnbroken: true,
      tempCompliant: true,
      noDuplicateScans: true
    },
    recallNotice: {
      recallId: "REC-2024-098",
      classification: "Class I Urgent Recall (Health Threat)",
      dateAnnounced: "2025-01-15",
      issuingBody: "Central Drugs Standard Control Organisation (CDSCO)",
      reason: "Potential micro-particulate precipitation detected during routine post-market stability surveillance, causing inconsistent therapeutic dosage in pediatric patients.",
      actionRequired: "Stop dispensing immediately. Quarantine existing stock in designated recall bins. Contact Apex Logistics for return freight authorization and batch credit reimbursement."
    },
    journey: [
      {
        id: "ev-r1",
        stage: "Manufacturing",
        title: "Batch Genesis & Release",
        facility: "Apex Hyderabad Facility",
        location: "Hyderabad, India",
        timestamp: "2024-03-10 10:00 IST",
        status: "COMPLETED",
        authorizedBy: "P. R. Sharma (Chief Quality Officer)",
        did: "did:apex:hyderabad:qc-01",
        details: "Original manufacturing release passed all baseline stability checks.",
        txHash: "0x221a...44f9",
        block: 817100
      },
      {
        id: "ev-r2",
        stage: "Recall Execution",
        title: "Regulatory Smart Contract Recall Triggered",
        facility: "CDSCO Pharmacovigilance Command",
        location: "New Delhi, India",
        timestamp: "2025-01-15 16:45 IST",
        status: "RECALLED",
        authorizedBy: "Regulatory Director General",
        did: "did:gov:cdsco:inspectorate:09",
        details: "Smart contract function lockBatchForRecall() executed. All downstream barcode scans immediately display critical safety recall alert.",
        txHash: "0x98124bca...8374",
        block: 819190
      }
    ]
  },
  {
    id: "MT-6603-COLD",
    name: "Lantus (Insulin Glargine)",
    brand: "Sanofi-Aventis",
    dosage: "100 Units/mL SoluStar Pre-filled Pen",
    ndc: "0088-2220-33",
    gtin: "00300882220339",
    batchNumber: "B6603-C",
    serialNumber: "SN-2024-6603-S8L",
    status: "COLD_CHAIN_BREACH",
    manufactureDate: "2024-11-01",
    expiryDate: "2026-05-01",
    storageTemp: "Strict Cold Chain: 2°C to 8°C (Do not freeze)",
    currentTemp: "14.6°C (Exceeded threshold for > 7 hours)",
    composition: "Insulin glargine 100 units/ml, m-cresol, glycerol, zinc, water for injection",
    packageType: "Carton of 5 SoloStar Pens (3ml each)",
    authenticityScore: 54.0,
    scanCount: 2,
    verifiedAt: "25 mins ago",
    manufacturerAddress: "Sanofi Frankfurt Biotechnology Park, Germany",
    currentLocation: "Regional Cold Hub Bay 3",
    cryptoProof: {
      blockNumber: 819230,
      txHash: "0x44a98123cba98102938471625340192837461524310928374615243109283746",
      merkleRoot: "0xbb71625340192837461524310928374615243109283746152431092837461524",
      digitalSignature: "VALID-MFR-SIGNATURE",
      smartContract: "0x3e17B7A9e3158c8DbFe6c986Db214A3Fa0B29D55",
      consensus: "IoT Telemetry Oracle Flagged Thermal Violation"
    },
    tamperChecklist: {
      sealIntegrity: true,
      hologramValid: true,
      hashMatched: true,
      custodyUnbroken: true,
      tempCompliant: false, // VIOLATED
      noDuplicateScans: true
    },
    temperatureBreach: {
      permittedRange: "2.0°C to 8.0°C",
      peakRecorded: "14.6°C",
      durationAboveThreshold: "7 Hours 22 Minutes",
      carrierSensorId: "IOT-REEFER-SENS-8841",
      impactAssessment: "Protein denaturation probable. Efficacy cannot be guaranteed. Biologic structure degraded."
    },
    journey: [
      {
        id: "ev-c1",
        stage: "Manufacturing",
        title: "Insulin Synthesis & Cryo-packaging",
        facility: "Sanofi Frankfurt Biotech Hub",
        location: "Frankfurt, Germany",
        timestamp: "2024-11-01 07:00 CET",
        status: "COMPLETED",
        authorizedBy: "K. Becker (Biologics QC)",
        did: "did:sanofi:frankfurt:bio02",
        details: "Synthesized under GMP cryogenic conditions. Initial sensor calibration 3.5°C.",
        txHash: "0x1102...99aa",
        block: 818900
      },
      {
        id: "ev-c2",
        stage: "Transit Logistics",
        title: "IoT Temperature Sensor Alarm",
        facility: "Trans-Continental Reefer Freight #902",
        location: "En Route to Newark Hub, NJ",
        timestamp: "2024-11-04 18:20 EST",
        status: "FAILED",
        authorizedBy: "Automated ChainLink IoT Oracle",
        did: "did:oracle:chainlink:iot:temp-902",
        details: "Cooling compressor auxiliary power failure. Reefer cabin temp climbed to 14.6°C for 7+ hours.",
        txHash: "0x44a9...3746",
        block: 819230
      }
    ]
  }
];

export const mockLedgerBlocks = [
  {
    blockNumber: 819248,
    timestamp: "Just now (12s ago)",
    validator: "node-fda-cder.eth",
    validatorLabel: "FDA CDER Regulatory Node",
    txCount: 42,
    merkleRoot: "0x89f41b2a9d8c7e10a234f9a0b8c7e6d5c4b3a201",
    gasUsed: "1,248,190",
    status: "FINALIZED",
    eventSummary: "Batch MT-9921-AUTH custody handoff verified by CVS Pharmacy NY"
  },
  {
    blockNumber: 819247,
    timestamp: "1 min ago",
    validator: "node-pfizer-mfg.eth",
    validatorLabel: "Pfizer Global Serialization Node",
    txCount: 18,
    merkleRoot: "0x77c21e90a8b7d6c5b4a3928170f9e8d7c6b5a402",
    gasUsed: "820,440",
    status: "FINALIZED",
    eventSummary: "Minted 50,000 units of Paxlovid Batch #PX-2025-01"
  },
  {
    blockNumber: 819246,
    timestamp: "3 mins ago",
    validator: "node-sentinel-fraud.eth",
    validatorLabel: "MediTrace Autonomous Sentinel Node",
    txCount: 1,
    merkleRoot: "0xDEADBEEF98124a9c81726aef19284ba102948bbca",
    gasUsed: "450,120",
    status: "FINALIZED",
    eventSummary: "CRITICAL: Duplicate scan collision detected on serial SN-2024-8842-F9K"
  },
  {
    blockNumber: 819245,
    timestamp: "6 mins ago",
    validator: "node-mckesson-logistics.eth",
    validatorLabel: "McKesson Supply Chain Node",
    txCount: 88,
    merkleRoot: "0x55d10a9b8c7e6d5c4b3a20198124a9c81726aef1",
    gasUsed: "2,910,800",
    status: "FINALIZED",
    eventSummary: "IoT Cold Chain compliance telemetry batch sealed (512 GPS checkpoints)"
  },
  {
    blockNumber: 819244,
    timestamp: "10 mins ago",
    validator: "node-who-surveillance.eth",
    validatorLabel: "WHO Anti-Counterfeiting Taskforce Node",
    txCount: 5,
    merkleRoot: "0x1102938475610293847561029384756102938475",
    gasUsed: "310,200",
    status: "FINALIZED",
    eventSummary: "Broadcasted global alert for suspect antimalarial counterfeits in West Africa"
  }
];

export const fraudMetrics = {
  totalBatchesTracked: "1,489,210",
  authenticityRate: "99.84%",
  counterfeitsIntercepted: "3,842",
  activeRecalls: 2,
  activeDuplicateAlerts: 1,
  protectedPatients: "12.8M+",
  validatorNodesActive: 14
};
