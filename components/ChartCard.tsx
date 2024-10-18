// components/ChartCard.tsx
import React from 'react';

interface ChartCardProps {
    title: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ title }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold">{title}</h3>
        {/* Placeholder for chart */}
        <div className="mt-4 bg-gray-200 h-48 rounded-lg"></div>
        </div>
    );
};

export default ChartCard;
