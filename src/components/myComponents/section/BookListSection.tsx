"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import BookCard from '../card/BookCard'
import { Book } from '@prisma/client'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'

const BookListSection = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [books, setBooks] = useState<Book[]>([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get("http://localhost:3000/api/books", {
        params: {
          query: searchParams.get("search")
        }
      })

      setBooks(data)
    }

    fetch()
  }, [searchParams])

  const handleSearch = () => {
    router.push(`?search=${search}`);
  };

  return (
    <div className='container-responsive py-20'>
      <form
        className='flex gap-2 pt-8 xl:w-[50%]'
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}>
        <Input placeholder='Search Books....' onChange={(e) => setSearch(e.target.value)} />
        <Button className='px-8' type='submit' onClick={handleSearch}>Search</Button>
      </form>
      <div className='grid grid-cols-1 gap-6 py-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {books && books.map((book) => (
          <BookCard name={book.title} author={book.author} image={book.image} key={book.id} />
        ))}
      </div>
    </div>
  )
}

export default BookListSection