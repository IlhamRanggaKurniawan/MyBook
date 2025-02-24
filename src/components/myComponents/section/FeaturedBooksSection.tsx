import React from 'react'
import BookCard from '../card/BookCard'
import axios from 'axios'
import { Book } from '@prisma/client'

const FeaturedBooksSection = async () => {
    try {
        const res = await axios.get("http://localhost:3000/api/books/latest")
        const books: Book[] = res.data

        return (
            <section className='py-20 space-y-8 container-responsive'>
                <h4 className='text-3xl text-center font-semibold'>Featured Books</h4>
                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4'>
                    {books.map((book) => (
                        <BookCard name={book.title} author={book.author} image={book.image} key={book.image} />
                    ))}
                </div>
            </section>
        )
    } catch (error) {
        return (
            <div>{(error as Error).message}</div>
        )
    }
}

export default FeaturedBooksSection