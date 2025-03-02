import AnalyticsOverview from '@/components/myComponents/dashboard/AnalyticsOverview'
import React from 'react'

const page = () => {
    return (
        <div className='p-8'>
            <h2 className='text-3xl font-bold'>Analytics</h2>
            <AnalyticsOverview />
        </div>
    )
}

export default page