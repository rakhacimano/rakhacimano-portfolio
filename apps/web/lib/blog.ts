export interface Author {
    name: string;
    avatar: string; // URL path specific
    role: string;
}

export interface Blog {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    author: Author;
    date: string;
    readingTime: string;
    thumbnail: string;
    image: string;
    content: string;
    category: string;
    tags: string[];
}

import { fetchAPI } from './api';

export async function getAllBlogs(): Promise<Blog[]> {
    try {
        const blogs = await fetchAPI('/blogs');
        // Map API response to UI Blog interface if needed
        // Assuming API returns compatible format or we map it here
        return blogs.map((b: any) => ({
            ...b,
            // Ensure defaults for missing fields if API is partial
            author: b.author || { name: 'Rakha', avatar: '', role: 'Admin' },
            date: b.date || new Date(b.createdAt).toLocaleDateString(),
            readingTime: b.readingTime || '5 min read',
            thumbnail: b.thumbnail || b.coverImage || '',
            image: b.coverImage || b.thumbnail || '',
            category: b.category || 'Tech',
            tags: b.tags || []
        }));
    } catch (error) {
        console.error('Failed to fetch blogs', error);
        return [];
    }
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
    try {
        const blog = await fetchAPI(`/blogs/${slug}`);
        return {
            ...blog,
            author: blog.author || { name: 'Rakha', avatar: '', role: 'Admin' },
            date: blog.date || new Date(blog.createdAt).toLocaleDateString(),
            readingTime: blog.readingTime || '5 min read',
            thumbnail: blog.thumbnail || blog.coverImage || '',
            image: blog.coverImage || blog.thumbnail || '',
            category: blog.category || 'Tech',
            tags: blog.tags || []
        };
    } catch (error) {
        return null;
    }
}
