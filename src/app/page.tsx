import Link from 'next/link';
import SiteNavigation from '~components/molecules/SiteNavigation';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between container">
            <SiteNavigation />
            <h1>Next auth</h1>
            <Link href="/register">Register</Link>
            <Link href="/login">Login</Link>
            <Link href="/dashboard">Dashboard</Link>
        </main>
    );
}

