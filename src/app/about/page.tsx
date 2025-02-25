import AboutSection from '@/components/myComponents/section/AboutSection'
import React from 'react'

const page = () => {
    return (
        <div className='py-20 space-y-20 px-4 sm:px-6 md:px-8 lg:px-32 xl:px-64'>
            <h2 className='font-bold text-3xl text-center'>Perpustakaan kami</h2>
            <AboutSection />
        </div>
    )
}

export default page