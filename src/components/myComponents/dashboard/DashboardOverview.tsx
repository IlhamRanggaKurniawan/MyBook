import React from 'react'
import StatisticCard from '../card/StatisticCard'
import { ChartColumnStacked, HandHelping, LayoutDashboard, Users } from 'lucide-react'
import MostPopularBookCard from '../card/MostPopularBookCard'

const cards = [
    {
        icon: LayoutDashboard,
        title: "Total Books",
        amount: 120
    },
    {
        icon: Users,
        title: "Total Students",
        amount: 1150
    },
    {
        icon: HandHelping,
        title: "Active Loans",
        amount: 65
    },
    {
        icon: ChartColumnStacked,
        title: "Total Categories",
        amount: 20
    },
]

const DashboardOverview = () => {
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

export default DashboardOverview