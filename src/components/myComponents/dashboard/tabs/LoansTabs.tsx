"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TabsContent } from '@/components/ui/tabs'
import React, { useEffect, useState } from 'react'
import PaginationBar from '../PaginationBar'
import { EllipsisVertical } from 'lucide-react'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'

type loan = {
    id: number,
    loanDate: Date,
    book: { title: string },
    student: { name: string },
}

const LoansTabs = () => {
    const [loans, setLoans] = useState<loan[]>([])
    const [totalLoan, setTotalLoan] = useState<number>(0)
    const searchParams = useSearchParams()
    const page = Number(searchParams.get("page")) || 1

    useEffect(() => {
        const fetchStudents = async () => {
            const { data } = await axios.get(`/api/loans?page=${page}`)

            setLoans(data)
        }

        fetchStudents()
    }, [page])

    useEffect(() => {
        const fetch = async () => {
            const { data } = await axios.get(`/api/loans/count`)

            setTotalLoan(data)
        }

        fetch()
    }, [])
    return (
        <TabsContent value='loans' className='space-y-8'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nama buku</TableHead>
                        <TableHead>Nama siswa</TableHead>
                        <TableHead>tanggal meminjam</TableHead>
                        <TableHead>Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loans.map((loan) => (
                        <TableRow key={loan.id}>
                            <TableCell>{loan.book.title}</TableCell>
                            <TableCell>{loan.student.name}</TableCell>
                            <TableCell>
                                {new Date(loan.loanDate).toLocaleDateString("id-ID", {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric"
                                })}
                            </TableCell>
                            <TableCell><EllipsisVertical /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <PaginationBar currentPage={page} totalData={totalLoan} />
        </TabsContent>
    )
}

export default LoansTabs