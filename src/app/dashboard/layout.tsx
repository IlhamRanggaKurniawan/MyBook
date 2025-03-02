import Sidebar from '@/components/myComponents/dashboard/Sidebar';
import React from 'react'

const layout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
    return (
        <>
            <Sidebar />
            <div className='pt-16 sm:pt-0 sm:pl-16 lg:pl-52 xl:pl-64'>
                {children}
            </div>
        </>
    )
}

export default layout