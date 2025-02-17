import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React from 'react'

const HeroSection = () => {
    return (
        <section className='w-full h-screen text-center flex flex-col gap-4 items-center justify-center container-responsive'>
            <h3 className='text-3xl font-extrabold sm:text-4xl lg:text-5xl'>Discover Your Next Great Read</h3>
            <p className='text-gray-500 text-lg lg:max-w-[50%] lg:text-xl'>Explore our vast collection of books, from timeless classics to the latest bestsellers.</p>
            <div className='flex gap-2 w-full max-w-96 item'>
                <Input placeholder='Search Books...'/>
                <Button>
                    <Search />
                    Search
                </Button>
            </div>
        </section>
    )
}

export default HeroSection