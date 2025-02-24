"use client"

import React, { useEffect, useState } from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import BookCard from './card/BookCard'
import axios from "axios"
import { Book } from '@prisma/client'

const BookCarousel = () => {
    const [books, setBooks] = useState<Book[]>([])

    useEffect(() => {
        const fetch = async () => {
            const books = await axios.get("http://localhost:3000/api/books/latest")
            setBooks(books.data)
        }

        fetch()
    }, [])

    return (
        <Carousel className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
            <CarouselContent className=''>
                {books && books.map((book) => (
                    <CarouselItem key={book.image} className='aspect-auto basis-full'>
                        <BookCard author={book.author} image={book.image} name={book.title} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselNext className='hidden sm:flex' />
            <CarouselPrevious className='hidden sm:flex' />
        </Carousel>
    )
}

export default BookCarousel