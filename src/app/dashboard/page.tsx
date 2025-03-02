import DashboardOverview from '@/components/myComponents/dashboard/DashboardOverview'
import React from 'react'

const page = () => {
    return (
        <div className='p-8'>
            <h2 className='text-3xl font-bold'>Dashboard</h2>
            <DashboardOverview />
        </div>
    )
}

export default page