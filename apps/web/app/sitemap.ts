import { MetadataRoute } from 'next';

async function getProjects() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/projects`, {
            next: { revalidate: 3600 }
        });
        if (!res.ok) return [];
        return res.json();
    } catch (e) {
        return [];
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://rakhacimano.vercel.app';
    const projects = await getProjects();

    const projectUrls = projects.map((project: any) => ({
        url: `${baseUrl}/portfolio/${project.slug}`,
        lastModified: new Date(project.created_at || Date.now()),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: `${baseUrl}/portfolio`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        ...projectUrls,
    ];
}
