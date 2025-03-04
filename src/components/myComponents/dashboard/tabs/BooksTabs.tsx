"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TabsContent } from '@/components/ui/tabs'
import React, { useEffect, useState } from 'react'
import PaginationBar from '../PaginationBar'
import { EllipsisVertical, Plus } from 'lucide-react'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { Book } from '@prisma/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useDebounce } from 'use-debounce'
import Link from 'next/link'
import CreateCategoryDialog from '../dialog/CreateCategoryDialog'
import DeleteDataDialog from '../dialog/DeleteDataDialog'

const BooksTabs = () => {
    const [books, setBooks] = useState<Book[]>([])
    const [totalBook, setTotalBook] = useState<number>(0)
    const [query, setQuery] = useState("")
    const searchParams = useSearchParams()
    const page = Number(searchParams.get("page")) || 1
    const [queryDebounce] = useDebounce(query, 300)



    useEffect(() => {
        const fetchBooks = async () => {
            const { data } = await axios.get(`/api/books?page=${page}&query=${query}`)

            setBooks(data)
        }

        fetchBooks()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, queryDebounce])

    useEffect(() => {
        const fetch = async () => {
            const { data } = await axios.get(`/api/books/count`)

            setTotalBook(data)
        }

        fetch()
    }, [])

    return (
        <TabsContent value='books' className='py-4 space-y-4'>
            <div className='flex justify-between gap-2'>
                <Input className='max-w-96' placeholder='search Books' value={query} onChange={(e) => setQuery(e.target.value)} />
                <Button asChild>
                    <Link href={"/dashboard/form/book"}>
                        <p className='hidden sm:block'>Create A New Book</p>
                        <Plus className='sm:hidden' />
                    </Link>
                </Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nama buku</TableHead>
                        <TableHead>Nama penulis</TableHead>
                        <TableHead>Nama penerbit</TableHead>
                        <TableHead>ISBN</TableHead>
                        <TableHead>Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {books.map((book) => (
                        <TableRow key={book.id}>
                            <TableCell>{book.title}</TableCell>
                            <TableCell>{book.author}</TableCell>
                            <TableCell>{book.publisher}</TableCell>
                            <TableCell>{book.isbn}</TableCell>
                            <TableCell><DeleteDataDialog id={book.id} variant='book'><EllipsisVertical className='cursor-pointer'/></DeleteDataDialog></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className='flex justify-end'>
                <CreateCategoryDialog />
            </div>
            <PaginationBar currentPage={page} totalData={totalBook} />
        </TabsContent>
    )
}

export default BooksTabs