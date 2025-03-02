"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TabsContent } from '@/components/ui/tabs'
import React, { useEffect, useState } from 'react'
import PaginationBar from '../PaginationBar'
import { EllipsisVertical } from 'lucide-react'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { Book } from '@prisma/client'

const BooksTabs = () => {
    const [books, setBooks] = useState<Book[]>([])
    const [totalBook, setTotalBook] = useState<number>(0)
    const searchParams = useSearchParams()
    const page = Number(searchParams.get("page")) || 1

    useEffect(() => {
        const fetchStudents = async () => {
            const { data } = await axios.get(`/api/books?page=${page}`)

            setBooks(data)
        }

        fetchStudents()
    }, [page])

    useEffect(() => {
        const fetch = async () => {

            const { data } = await axios.get(`/api/books/count`)

            setTotalBook(data)
        }

        fetch()
    }, [])
    return (
        <TabsContent value='books'>
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
                            <TableCell><EllipsisVertical /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <PaginationBar currentPage={page} totalData={totalBook} />
        </TabsContent>
    )
}

export default BooksTabs