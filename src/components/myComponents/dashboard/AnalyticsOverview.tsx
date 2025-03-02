"use client"

import React, { useEffect, useState } from "react";
import StatisticCard from "../card/StatisticCard";
import { ChartColumnStacked, HandHelping, LayoutDashboard, Users } from "lucide-react";
import MostPopularBookCard from "../card/MostPopularBookCard";
import axios from "axios";

const AnalyticsOverview = () => {
    const [totalBooks, setTotalBooks] = useState(0);
    const [totalStudents, setTotalStudents] = useState(0);
    const [activeLoans, setActiveLoans] = useState(0);
    const [totalCategories, setTotalCategories] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const [studentsRes, booksRes, loansRes, categoriesRes] = await Promise.all([
                axios.get(`/api/students/count`),
                axios.get(`/api/books/count`),
                axios.get(`/api/loans/count`),
                axios.get(`/api/categories/count`),
            ]);

            setTotalStudents(studentsRes.data);
            setTotalBooks(booksRes.data);
            setActiveLoans(loansRes.data);
            setTotalCategories(categoriesRes.data);

        };

        fetchData();
    }, []);

    const cards = [
        {
            icon: LayoutDashboard,
            title: "Total Books",
            amount: totalBooks,
        },
        {
            icon: Users,
            title: "Total Students",
            amount: totalStudents,
        },
        {
            icon: HandHelping,
            title: "Active Loans",
            amount: activeLoans,
        },
        {
            icon: ChartColumnStacked,
            title: "Total Categories",
            amount: totalCategories,
        },
    ];

    return (
        <div className='flex flex-col gap-4 py-4'>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                {cards.map((card) => (
                    <StatisticCard Icon={card.icon} amount={card.amount} title={card.title} key={card.title} />
                ))}
            </div>
            <MostPopularBookCard />
        </div>
    )
}

export default AnalyticsOverview