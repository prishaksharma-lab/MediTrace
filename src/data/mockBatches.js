// MediTrace Pharmaceutical Registry Data

export const initialBatches = [
  {
    id: "MT-9921-AUTH",
    name: "Lipitor (Atorvastatin Calcium)",
    brand: "Pfizer Inc.",
    dosage: "20 mg Film-Coated Tablets",
    ndc: "0069-4210-66",
    gtin: "00300694210668",
    batchNumber: "B9921-X",
    serialNumber: "SN-2024-9921-X7Q",
    status: "AUTHENTIC",
    manufactureDate: "2024-10-12",
    expiryDate: "2027-10-12",
    storageTemp: "20°C to 25°C",
    currentTemp: "21.4°C",
    composition: "Atorvastatin Calcium Trihydrate 20mg, microcrystalline cellulose, lactose monohydrate",
    packageType: "Blister Pack (30 Tablets) with Tamper-Evident Seal",
    authenticityScore: 100,
    scanCount: 1,
    verifiedAt: "Just now",
    manufacturerAddress: "Pfizer Biotech Campus, Kalamazoo, MI",
    currentLocation: "CVS Health Dispensary #4829, New York, NY",
    cryptoProof: {
      blockNumber: 819245,
      txHash: "0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
      merkleRoot: "0x4e2b9c7a10f8821d3e89a24177b856c9a9d2011fb571ea32a39a8c028e93214a",
      smartContract: "0x3e17B7A9e3158c8DbFe6c986Db214A3Fa0B29D55"
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
        id: "step-1",
        stage: "Production & Packaging",
        facility: "Pfizer Biotech Complex",
        location: "Kalamazoo, MI",
        timestamp: "2024-10-12 08:30 EST",
        status: "COMPLETED",
        authorizedBy: "Dr. Elena Vance (Serialization Lead)",
        details: "Assay release 99.8% purity. Serialization minted to blockchain.",
        txHash: "0x1a89b...e4f1",
        block: 819001
      },
      {
        id: "step-2",
        stage: "Regulatory Clearance",
        facility: "CDER Compliance Review",
        location: "Silver Spring, MD",
        timestamp: "2024-10-15 14:20 EST",
        status: "COMPLETED",
        authorizedBy: "FDA Verified Node",
        details: "Certificate of Analysis recorded. Commercial release authorized.",
        txHash: "0x3c91d...77a9",
        block: 819088
      },
      {
        id: "step-3",
        stage: "Logistics Transit",
        facility: "McKesson Distribution Hub",
        location: "Chicago, IL",
        timestamp: "2024-10-19 11:45 CST",
        status: "COMPLETED",
        authorizedBy: "Marcus Thorne (Logistics Lead)",
        details: "Temperature compliant (21.4°C). Zero deviation during transit.",
        txHash: "0x5d44a...bb12",
        block: 819142
      },
      {
        id: "step-4",
        stage: "Pharmacy Intake",
        facility: "CVS Pharmacy #4829",
        location: "New York, NY",
        timestamp: "2024-10-24 09:15 EDT",
        status: "COMPLETED",
        authorizedBy: "Sarah Lin, PharmD",
        details: "Inbound barcode matched ledger record. Placed in dispensary.",
        txHash: "0x7f83b...9069",
        block: 819245
      }
    ]
  },
  {
    id: "MT-8842-WARN",
    name: "Amoxicillin Trihydrate",
    brand: "Sandoz Laboratories (Claimed)",
    dosage: "500 mg Capsules",
    ndc: "0781-2613-05",
    gtin: "00307812613052",
    batchNumber: "B8842-F",
    serialNumber: "SN-2024-8842-F9K",
    status: "SUSPICIOUS_DUPLICATE",
    manufactureDate: "2024-09-05",
    expiryDate: "2026-09-05",
    storageTemp: "15°C to 25°C",
    currentTemp: "Unregulated",
    composition: "Label claims: Amoxicillin 500mg. Inconsistent physical excipient markers flagged.",
    packageType: "Bottle of 100 Capsules (Clone Packaging Detected)",
    authenticityScore: 18,
    scanCount: 14,
    verifiedAt: "Alert active",
    manufacturerAddress: "Claimed: Kundl, Austria | Origin: Gray Market Clone",
    currentLocation: "Multiple Conflicting Locations (Mumbai & London)",
    cryptoProof: {
      blockNumber: 819210,
      txHash: "0xDEADBEEF...77194A3D",
      merkleRoot: "0x00000000...FAILED",
      smartContract: "0x3e17B7A9e3158c8DbFe6c986Db214A3Fa0B29D55"
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
      reason: "Concurrent Duplicate Scans Detected",
      description: "This serial number (SN-2024-8842-F9K) was scanned in two distant locations within 17 minutes without an authorized transfer event.",
      collisionLocations: [
        { city: "Mumbai", store: "Apollo Pharmacy", time: "14:15 UTC" },
        { city: "London", store: "Boots Retail", time: "14:32 UTC" }
      ],
      recommendation: "Quarantine stock immediately. Do not dispense. Report to national pharmacovigilance."
    },
    journey: [
      {
        id: "step-w1",
        stage: "Production Genesis",
        facility: "Original Manufacturing Plant",
        location: "Kundl, Austria",
        timestamp: "2024-09-05 09:00 CET",
        status: "COMPLETED",
        authorizedBy: "Original Token Minted",
        details: "Legitimate original token minted. Barcode replicated by unauthorized third party.",
        txHash: "0x8912a...110b",
        block: 818450
      },
      {
        id: "step-w2",
        stage: "Anomaly Detection",
        facility: "Sentinel Watchtower",
        location: "Distributed Network",
        timestamp: "Today 14:32 UTC",
        status: "FAILED",
        authorizedBy: "Automated Fraud Engine",
        details: "Geographic velocity collision: 7,200 km traversed in 17 minutes. Serial flagged.",
        txHash: "0xDEAD...7719",
        block: 819210
      }
    ]
  },
  {
    id: "MT-7719-RECL",
    name: "Pediatric Paracetamol Suspension",
    brand: "Apex Healthcare",
    dosage: "120 mg / 5 mL Oral Suspension",
    ndc: "51655-214-52",
    gtin: "00351655214521",
    batchNumber: "B7719-R",
    serialNumber: "SN-2024-7719-R3A",
    status: "RECALLED",
    manufactureDate: "2024-03-10",
    expiryDate: "2025-03-10",
    storageTemp: "Below 25°C",
    currentTemp: "23.1°C",
    composition: "Paracetamol 120mg per 5ml, sucrose, methylparaben",
    packageType: "Amber Glass Bottle (100ml)",
    authenticityScore: 65,
    scanCount: 3,
    verifiedAt: "Notice Active",
    manufacturerAddress: "Apex Industrial Estate, Hyderabad, India",
    currentLocation: "Regional Distribution Depot",
    cryptoProof: {
      blockNumber: 819190,
      txHash: "0x98124bca881726aef19284ba102948bbca718293049182390192837461928374",
      merkleRoot: "0xcc817261552a4b81098234610928374615243109283746152431092837461524",
      smartContract: "0x3e17B7A9e3158c8DbFe6c986Db214A3Fa0B29D55"
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
      classification: "Class I Urgent Recall",
      dateAnnounced: "2025-01-15",
      issuingBody: "CDSCO Pharmacovigilance",
      reason: "Potential micro-particulate precipitation detected during routine stability monitoring.",
      actionRequired: "Stop dispensing immediately. Quarantine existing stock for distributor credit."
    },
    journey: [
      {
        id: "step-r1",
        stage: "Production Genesis",
        facility: "Apex Hyderabad Facility",
        location: "Hyderabad, India",
        timestamp: "2024-03-10 10:00 IST",
        status: "COMPLETED",
        authorizedBy: "P. R. Sharma (CQO)",
        details: "Original manufacturing release passed baseline stability checks.",
        txHash: "0x221a...44f9",
        block: 817100
      },
      {
        id: "step-r2",
        stage: "Regulatory Recall",
        facility: "Regulatory Authority",
        location: "New Delhi, India",
        timestamp: "2025-01-15 16:45 IST",
        status: "RECALLED",
        authorizedBy: "Regulatory Director General",
        details: "Smart contract recall executed. Downstream dispensation blocked.",
        txHash: "0x9812...8374",
        block: 819190
      }
    ]
  }
];

export const mockLedgerBlocks = [
  {
    blockNumber: 819248,
    timestamp: "2 mins ago",
    validator: "node-fda-cder.eth",
    validatorLabel: "Regulatory Compliance Node",
    txCount: 38,
    merkleRoot: "0x89f41b2a9d8c7e10a234f9a0b8c7e6d5c4b3a201",
    eventSummary: "Batch MT-9921-AUTH custody handoff verified by CVS Pharmacy NY"
  },
  {
    blockNumber: 819247,
    timestamp: "5 mins ago",
    validator: "node-pfizer-mfg.eth",
    validatorLabel: "Pfizer Global Serialization Node",
    txCount: 16,
    merkleRoot: "0x77c21e90a8b7d6c5b4a3928170f9e8d7c6b5a402",
    eventSummary: "Minted 50,000 units of Paxlovid Batch #PX-2025-01"
  },
  {
    blockNumber: 819246,
    timestamp: "9 mins ago",
    validator: "node-sentinel-fraud.eth",
    validatorLabel: "Autonomous Sentinel Node",
    txCount: 1,
    merkleRoot: "0xDEADBEEF98124a9c81726aef19284ba102948bbca",
    eventSummary: "Duplicate scan collision flagged on serial SN-2024-8842-F9K"
  }
];

export const fraudMetrics = {
  authenticityRate: "98.7%",
  duplicateDetections: 142,
  activeRecalls: 8,
  thermalExcursions: 23
};
