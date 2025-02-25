import React from 'react'
import HeroCTA from '../HeroCTA'

const HeroSection = () => {
    return (
        <section className='w-full h-screen text-center flex flex-col gap-4 items-center justify-center container-responsive'>
            <h3 className='text-3xl font-extrabold sm:text-4xl lg:text-5xl'>Temukan Bacaan Hebat Anda</h3>
            <p className='text-gray-500 text-lg lg:max-w-[50%] lg:text-xl'>Jelajahi koleksi buku kami yang luas, mulai dari buku klasik abadi hingga buku terlaris terbaru.</p>
            <HeroCTA />
        </section>
    )
}

export default HeroSection