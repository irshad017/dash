"use client";
import React, { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement } from "chart.js";
import axios from "axios";
import socket from "@/utils/socket";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement);

interface ScrapedData {
    title: string;
    price: number;
}

const Dashboard: React.FC = () => {
    const [webData, setWebData] = useState<number[]>([]);
    const [webTimes, setWebTimes] = useState<string[]>([]);

    const [scrapedData, setScrapedData] = useState<ScrapedData[]>([]);
    const [loading, setLoading] = useState(true);

    const [stockPrices, setStockPrices] = useState<number[]>([]);
    const [stockTimes, setStockTimes] = useState<string[]>([]);
    useEffect(() => {
        const apiKey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY
        if(!apiKey){
            console.log("API Key is missing")
            return
        }
        const ws = new WebSocket(`wss://ws.finnhub.io?token=${apiKey}`)
        ws.onopen = () => {
            ws.send(JSON.stringify({type: 'subscribe', symbol: 'AAPL'}))
        }
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data)
            if(data.type === 'trade'){
                const price = data.data[0].p  //p is the price in the trade
                const time = new Date().toLocaleTimeString()

                setStockPrices((prevPrices) => [...prevPrices, price])
                setStockTimes((prevTimes) => [...prevTimes, time])

            }
        }
        const interval = setInterval(()=>{
            ws.send(JSON.stringify({type: 'ping'}))
        }, 3000)
        return () => {
            clearInterval(interval)
            ws.close()
        }
    }, [])

    useEffect(() => {
        socket.on("data", (data: { value: number; time: string }) => {
            setWebData((prevData) => [...prevData, data.value]);
            setWebTimes((prevTime) => [...prevTime, data.time]);
        });
        return () => {
            socket.off("data");
        };
    }, []);

    useEffect(()=>{
    },[])

    const webDataChart = {
        labels: webTimes,
        datasets: [
            {
                label: "Real Time Data",
                data: webData,
                fill: false,
                borderColor: "rgba(255,99,132,1)",
                backgroundColor: "rgba(255,99,132,0.4)",
                tension: 0.1,
            },
        ],
    };

    const PieData = {
        labels: ['Category A', 'Category B', 'Category C'],
        datasets: [
            {
                label: 'Sample Pie Chart',
                data: [300, 50, 100], // Example data
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                ],
                hoverBackgroundColor: [
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                ],
            },
        ],
    };

    const stockDataChart = {
        labels: stockTimes,
        datasets: [
            {
                label: "Stock Prices",
                data: stockPrices,
                fill: false,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                tension: 0.1,
            },
        ],
    };


    return (
        <>
            <div>
            <div className="container mx-auto p-4">
            <h2>Stock Prices</h2>
                <Line data={stockDataChart} options={{ responsive: true }} />
            </div>
            </div>
            <div className="container mx-auto p-4">
                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                    <div className="bg-white p-6 shadow-lg rounded-lg transition-transform transform hover:scale-105 duration-300">
                        <h3 className="text-xl text-black font-semibold mb-2">Real Time Data</h3>
                        <Line data={webDataChart} options={{ responsive: true }} />
                    </div>
                    <div className="bg-white p-6 shadow-lg rounded-lg transition-transform transform hover:scale-105 duration-300">
                        <h3 className="text-xl font-semibold mb-2">Pie Chart</h3>
                        <Pie data={PieData} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;







