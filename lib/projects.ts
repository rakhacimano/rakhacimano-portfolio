export interface Project {
    slug: string;
    title: string;
    category: string;
    year: string;
    description: string;
    result: string;
    image: string; // Main thumbnail
    gallery: string[]; // Additional images for detail page
    client: string;
    role: string;
    problemStatement: string;
    keyFeatures: string[];
    myContribution: string[];
    designProcess: string[];
}

export const projects: Project[] = [
    {
        slug: "lare-jatim",
        title: "Lare Jatim",
        category: "Mobile Application",
        year: "2024",
        client: "Lare Jatim - Pemprov Jatim",
        role: "UI/UX Designer",
        description: "An anonymous reporting mobile application for Forum Anak Nasional Jawa Timur, developed by Pemprov Jatim.",
        result: "Mobile Design",
        image: "/assets/projects/lare-jatim.png",
        gallery: [
            "/assets/projects/lare-jatim-1.png",
            "/assets/projects/lare-jatim-2.png"
        ],
        problemStatement: "Children in East Java lacked a safe, accessible, and anonymous channel to report violence, bullying, or rights violations. Existing reporting mechanisms were bureaucratic and intimidating, leading to underreporting of critical issues facing the province's youth.",
        keyFeatures: [
            "Anonymous Reporting System",
            "Real-time Case Tracking",
            "Interactive Educational Hub",
            "Direct Integration with Child Protection Services",
            "Panic Button for Emergencies"
        ],
        myContribution: [
            "Conducted user research with child psychologists",
            "Designed the end-to-end mobile app experience",
            "Created a child-friendly visual language",
            "Prototyped user flows for high-stress scenarios"
        ],
        designProcess: [
            "Empathize: Interviews with children and counselors",
            "Define: Identifing barriers to reporting",
            "Ideate: Gamified safety features",
            "Prototype: Low-fidelity wireframes",
            "Test: Usability testing with youth groups"
        ]
    },
    {
        slug: "wms-petro",
        title: "WMS Petro",
        category: "Mobile Application",
        year: "2025",
        client: "Petrokimia Gresik",
        role: "UI/UX Designer",
        description: "A comprehensive mobile warehouse management system designed to optimize inventory tracking and logistics for Petrokimia Gresik.",
        result: "Mobile Design",
        image: "/assets/projects/wms-petro.png",
        gallery: [
            "/assets/projects/wms-petro-1.jpg",
            "/assets/projects/wms-petro-2.jpg"
        ],
        problemStatement: "The legacy warehouse system relied on manual data entry and desktop-only access, causing delays in inventory updates and dispatching. Warehouse staff needed a mobile solution to manage stock in real-time from the floor.",
        keyFeatures: [
            "QR/Barcode Scanning Integration",
            "Real-time Stock Level Visualization",
            "Offline Mode for Remote Warehouses",
            "Automated Reordering Alerts",
            "Role-based Access Control"
        ],
        myContribution: [
            "Mapped complex logistical workflows",
            "Designed high-contrast UI for industrial environments",
            "Optimized touch targets for gloved usage",
            "Developed an intuitive scanning interface"
        ],
        designProcess: [
            "Site Visit: Observation of warehouse operations",
            "User Journey Mapping: Identifying bottlenecks",
            "UI Design: Focusing on readability and speed",
            "Validation: Field testing with warehouse staff"
        ]
    },
    {
        slug: "artomia-pos",
        title: "Artomia POS",
        category: "Web Platform",
        year: "2023",
        client: "Artomia",
        role: "UI/UX Designer",
        description: "A streamlined web-based point of sale system designed to simplify retail transactions and manage inventory efficiently.",
        result: "Web Design",
        image: "/assets/projects/artomia.png",
        gallery: [
            "/assets/projects/artomia-1.png",
            "/assets/projects/artomia-2.png"
        ],
        problemStatement: "Small to medium retail businesses struggled with complex, expensive POS systems that were difficult to train staff on. Artomia needed a simple, web-based solution that could run on any device without high installation costs.",
        keyFeatures: [
            "Cloud-based Inventory Management",
            "Multi-store Support",
            "Real-time Sales Analytics",
            "Employee Shift Management",
            "Customer Loyalty Program"
        ],
        myContribution: [
            "Created the complete Design System",
            "Designed the dashboard and POS interface",
            "Conducted A/B testing on checkout flows",
            "Collaborated with developers on implementation"
        ],
        designProcess: [
            "Market Research: Analyzing competitor POS",
            "Wireframing: Focusing on speed of transaction",
            "Visual Design: Clean, high-contrast aesthetic",
            "Testing: Simulation of busy retail hours"
        ]
    },
    {
        slug: "nedo-vision",
        title: "Nedo Vision",
        category: "Web Platform",
        year: "2025",
        client: "PT Petrokimia Gresik & PT Sinergi Dimensi Informatika",
        role: "UI/UX Designer",
        description: "An AI-powered PPE detection web platform designed to monitor safety compliance and automate hazard identification in industrial environments.",
        result: "Web Design",
        image: "/assets/projects/nedo-vision.png",
        gallery: [
            "/assets/projects/nedo-vision-1.png",
            "/assets/projects/nedo-vision-2.png"
        ],
        problemStatement: "Manual safety monitoring in large industrial plants is prone to human error and oversight. Ensuring 100% PPE compliance is critical for worker safety but difficult to enforce without automated tools.",
        keyFeatures: [
            "AI-powered PPE Detection",
            "Live CCTV Feed Integration",
            "Incident Reporting & Analytics",
            "Zone-based Safety Compliance",
            "Automated Violation Alerts"
        ],
        myContribution: [
            "Designed the alert management dashboard",
            "Created data visualization for safety metrics",
            "Designed the live monitoring interface",
            "Established the dark-mode interactions"
        ],
        designProcess: [
            "Requirement Analysis: Understanding safety protocols",
            "Dashboard Layout: Prioritizing critical alerts",
            "Visual Design: Cyber/Industrial aesthetic",
            "Prototype: Interactive alert simulation"
        ]
    },
    {
        slug: "forlux",
        title: "Forlux",
        category: "Desktop Application",
        year: "2025",
        client: "PT Catur Mukti Pratama (Siklon)",
        role: "UI/UX Designer",
        description: "A desktop application designed to manage and optimize the delivery of goods to customers.",
        result: "Desktop Design",
        image: "/assets/projects/forlux.png",
        gallery: [
            "/assets/projects/forlux-1.png",
            "/assets/projects/forlux-2.png"
        ],
        problemStatement: "Logistics companies face significant challenges in optimizing route planning and loading efficiency. Manual planning leads to increased fuel costs and delayed deliveries.",
        keyFeatures: [
            "Automated Route Optimization",
            "Fleet Management Dashboard",
            "Real-time Delivery Tracking",
            "Driver Performance Analytics",
            "Digital Proof of Delivery"
        ],
        myContribution: [
            "Designed the Route Planning Interface",
            "Created custom map interactions",
            "Developed the Fleet Overview dashboard",
            "Designed for Windows native experience"
        ],
        designProcess: [
            "User Research: Interviews with fleet managers",
            "Information Architecture: Sitemapping complex data",
            "UI Design: Clean, data-dense interface",
            "Testing: Usability testing with logistics coordinators"
        ]
    },
];
