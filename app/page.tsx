"use client"
import Dashboard from '@/components/Dashboard';

const Home: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Web Scraper</h1>
            <Dashboard/>
        </div>
    );
};

export default Home;
