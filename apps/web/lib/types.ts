
export interface Project {
    id?: string;
    slug: string;
    title: string;
    category?: string;
    year?: string;
    description: string;
    result?: string;
    image: string; // Main thumbnail or cover_image
    gallery?: string[];
    client?: string;
    role?: string;
    problemStatement?: string;
    keyFeatures?: string[];
    myContribution?: string[];
    designProcess?: string[];
    published?: boolean;
    created_at?: string;

    // Mapped fields compatibility
    techStack?: string[];
    repoUrl?: string;
    demoUrl?: string;
}
