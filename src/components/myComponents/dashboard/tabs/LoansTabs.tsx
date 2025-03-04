"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TabsContent } from '@/components/ui/tabs'
import React, { useEffect, useState } from 'react'
import PaginationBar from '../PaginationBar'
import { EllipsisVertical } from 'lucide-react'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { useDebounce } from 'use-debounce'
import CreateLoanDialog from '../dialog/CreateLoanDialog'
import DeleteDataDialog from '../dialog/DeleteDataDialog'

type loan = {
    id: string,
    loanDate: Date,
    book: { title: string },
    student: { name: string },
}

const LoansTabs = () => {
    const [loans, setLoans] = useState<loan[]>([])
    const [totalLoan, setTotalLoan] = useState<number>(0)
    const [query, setQuery] = useState("")
    const searchParams = useSearchParams()
    const page = Number(searchParams.get("page")) || 1
    const [queryDebounce] = useDebounce(query, 300)

    useEffect(() => {
        const fetchLoans = async () => {
            const { data } = await axios.get(`/api/loans?page=${page}&query=${query}`)

            setLoans(data)
        }

        fetchLoans()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, queryDebounce])

    useEffect(() => {
        const fetch = async () => {
            const { data } = await axios.get(`/api/loans/count`)

            setTotalLoan(data)
        }

        fetch()
    }, [])
    return (
        <TabsContent value='loans' className='py-4 space-y-4'>
            <div className='flex justify-between gap-2'>
                <Input className='max-w-96' placeholder='search Loans' value={query} onChange={(e) => setQuery(e.target.value)} />
                <CreateLoanDialog />
            </div>
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
                            <TableCell><DeleteDataDialog id={loan.id} variant='loan'><EllipsisVertical className='cursor-pointer'/></DeleteDataDialog></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <PaginationBar currentPage={page} totalData={totalLoan} />
        </TabsContent>
    )
}

export default LoansTabs