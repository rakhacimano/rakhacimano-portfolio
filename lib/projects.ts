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
}

export const projects: Project[] = [
    {
        slug: "fintech-dashboard",
        title: "Fintech Dashboard",
        category: "SaaS / Finance",
        year: "2024",
        client: "Nova Financial",
        role: "Lead Product Designer",
        description: "A comprehensive financial analytics dashboard designed to help users track expenses, investments, and savings goals in real-time.",
        result: "+45% User Retention",
        image: "/assets/projects/fintech-main.jpg",
        gallery: [
            "/assets/projects/fintech-1.jpg",
            "/assets/projects/fintech-2.jpg"
        ]
    },
    {
        slug: "ecommerce-mobile-app",
        title: "E-Commerce App",
        category: "Mobile Application",
        year: "2023",
        client: "Urban Threads",
        role: "UI/UX Designer",
        description: "A seamless mobile shopping experience built for high-volume fashion retail.",
        result: "2M+ App Downloads",
        image: "/assets/projects/ecommerce-main.jpg",
        gallery: [
            "/assets/projects/ecommerce-1.jpg",
            "/assets/projects/ecommerce-2.jpg"
        ]
    },
    {
        slug: "travel-booking-platform",
        title: "Travel Booking",
        category: "Web Platform",
        year: "2023",
        client: "Roam Global",
        role: "Product Designer",
        description: "An immersive travel booking platform that inspires wanderlust.",
        result: "3x Conversion Rate",
        image: "/assets/projects/travel-main.jpg",
        gallery: [
            "/assets/projects/travel-1.jpg",
            "/assets/projects/travel-2.jpg"
        ]
    },
    {
        slug: "medical-patient-portal",
        title: "Patient Portal",
        category: "Healthcare",
        year: "2022",
        client: "MediCore Systems",
        role: "UX Researcher & Designer",
        description: "A patient-centric portal simplifying appointment scheduling and record access.",
        result: "-30% Admin Time",
        image: "/assets/projects/medical-main.jpg",
        gallery: [
            "/assets/projects/medical-1.jpg",
            "/assets/projects/medical-2.jpg"
        ]
    },
];
