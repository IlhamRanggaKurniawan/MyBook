import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import React from 'react'
import BookCard from '../card/BookCard'

const books = [
    {
        image: "/academy crypto1.png",
        name: "Mastering Altcoins",
        author: "Academy Crypto"
    },
    {
        image: "/academy crypto2.png",
        name: "Crypto Trading Psychology",
        author: "Academy Crypto"
    },
    {
        image: "/academy crypto3.png",
        name: "Crypto Trading Principles",
        author: "Academy Crypto"
    },
    {
        image: "/academy crypto4.png",
        name: "Crypto Trading Guide",
        author: "Academy Crypto"
    },
    {
        image: "/academy crypto5.png",
        name: "Crypto Smart Money",
        author: "Academy Crypto"
    },
    {
        image: "/security analysis.png",
        name: "Security Analysis",
        author: "Benjamin Graham"
    },
    {
        image: "/the intelligent investor.png",
        name: "The Intelligent Investor",
        author: "Benjamin Graham"
    },
    {
        image: "/psychology of money.png",
        name: "Psychology Of Money",
        author: "Morgan Housel"
    },
]

const NewArrivalSection = () => {
    return (
        <section className='py-20 space-y-8 bg-card container-responsive'>
            <h4 className='text-3xl text-center font-semibold'>New Arrival</h4>
            <div className='w-full flex items-center justify-center'>
                <Carousel className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
                    <CarouselContent className=''>
                        {books.map((book) => (
                            <CarouselItem key={book.image} className='aspect-auto basis-full'>
                                <BookCard author={book.author} image={book.image} name={book.name} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselNext className='hidden sm:flex'/>
                    <CarouselPrevious className='hidden sm:flex'/>
                </Carousel>
            </div>
        </section>
    )
}

export default NewArrivalSection