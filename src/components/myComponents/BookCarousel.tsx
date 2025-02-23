"use client"

import React, { useEffect, useState } from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import BookCard from './card/BookCard'
import axios from "axios"

type book = {
    id: string,
    title: string,
    publisher: string,
    author: string,
    isbn: string,
    image: string,
    pages: number,
    categoryId: string,
    createdAt: Date,
    updatedAt: Date
}

const BookCarousel = () => {
    const [books, setBooks] = useState<book[]>([])

    useEffect(() => {
        const fetch = async () => {
            const books = await axios.get("/api/books/latest")
            console.log(books.data)
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
        </Carousel>)
}

export default BookCarousel