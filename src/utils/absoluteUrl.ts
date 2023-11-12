export const absoluteUrl = (path: string) => {
    if (typeof window !== 'undefined') return path;
    if (process.env.WEB_URL) return `${process.env.WEB_URL}${path}`;
    return `http://localhost:3000${path}`;
};
