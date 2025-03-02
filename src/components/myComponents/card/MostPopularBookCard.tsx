"use client"

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Book } from '@prisma/client'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

type popularBook = Book & {
    _count: { loan: number }
}

const MostPopularBookCard = () => {
    const [books, setBooks] = useState<popularBook[]>([])

    useEffect(() => {
        const fetch = async () => {
            const { data } = await axios.get(`/api/books/featured?take=4`)

            setBooks(data)
        }

        fetch()
    }, [])
    
    return (
        <Card className='col-span-4 bg-background'>
            <CardHeader>
                <h2 className='text-xl font-semibold'>Most Popular Books</h2>
            </CardHeader>
            <CardContent className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
                {books && books.map((book) => (
                    <div className='space-y-2' key={book.id}>
                        <Image src={book.image} alt={book.title} width={1000} height={1000} className='aspect-square object-cover rounded-md' />
                        <h3 className='text-lg font-normal'>{book.title}</h3>
                        <p className='text-slate-500'>Borrowed {book._count.loan} times</p>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

export default MostPopularBookCard