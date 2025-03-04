"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import BookCard from '../card/BookCard'
import { Book } from '@prisma/client'
import axios from 'axios'
import { useDebounce } from "use-debounce"
import { useSearchParams } from 'next/navigation'
import CategorySelect from '../CategorySelect'
const BookListSection = () => {
  const searchParams = useSearchParams()
  const [books, setBooks] = useState<Book[]>([])
  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [searchDebounce] = useDebounce(search, 300)
  const [categoryDebounce] = useDebounce(selectedCategory, 300)

  const fetchBooks = async () => {
    const { data } = await axios.get(`/api/books`, {
      params: {
        query: search,
        category: selectedCategory,
        take: 9999
      }
    })

    setBooks(data)
  }

  useEffect(() => {
    fetchBooks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDebounce, categoryDebounce])

  return (
    <div className='container-responsive min-h-screen'>
      <div className='grid grid-cols-2 gap-2 pt-8 md:grid-cols-3 xl:w-[70%]'>
        <Input placeholder='Search Books....' onChange={(e) => setSearch(e.target.value)} value={search} />
        <CategorySelect setSelectedCategory={setSelectedCategory} />
        <Button className='px-8 col-span-2 md:col-span-1' type='submit' onClick={fetchBooks}>Search</Button>
      </div>
      <div className=' grid grid-cols-1 gap-6 py-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {books && books.map((book) => (
          <BookCard id={book.id} name={book.title} author={book.author} image={book.image} key={book.id} />
        ))}
      </div>
    </div>
  )
}

export default BookListSection