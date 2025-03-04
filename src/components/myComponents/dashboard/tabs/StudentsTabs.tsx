"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TabsContent } from '@/components/ui/tabs'
import { EllipsisVertical } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import PaginationBar from '../PaginationBar'
import { Student } from '@prisma/client'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { useDebounce } from 'use-debounce'
import CreateStudentDialog from '../dialog/CreateStudentDialog'
import DeleteDataDialog from '../dialog/DeleteDataDialog'

const StudentsTabs = () => {
    const [students, setStudents] = useState<Student[]>([])
    const [totalStudent, setTotalStudent] = useState<number>(0)
    const [query, setQuery] = useState("")
    const searchParams = useSearchParams()
    const page = Number(searchParams.get("page")) || 1
    const [queryDebounce] = useDebounce(query, 300)



    useEffect(() => {
        const fetchStudents = async () => {
            const { data } = await axios.get(`/api/students?page=${page}&query=${query}`)

            setStudents(data)
        }

        fetchStudents()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, queryDebounce])

    useEffect(() => {
        const fetch = async () => {

            const { data } = await axios.get(`/api/students/count`)

            setTotalStudent(data)
        }

        fetch()
    }, [])

    return (
        <TabsContent value='students' className='py-4 space-y-4'>
            <div className='flex justify-between gap-2'>
                <Input className='max-w-96' placeholder='search Students' value={query} onChange={(e) => setQuery(e.target.value)} />
                <CreateStudentDialog />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nama</TableHead>
                        <TableHead>NIS</TableHead>
                        <TableHead>Kelas</TableHead>
                        <TableHead>Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {students.map((student) => (
                        <TableRow key={student.id}>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{student.nis}</TableCell>
                            <TableCell>{student.class}</TableCell>
                            <TableCell><DeleteDataDialog id={student.id} variant='student'><EllipsisVertical className='cursor-pointer' /></DeleteDataDialog></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <PaginationBar totalData={totalStudent} currentPage={page} />
        </TabsContent>
    )
}

export default StudentsTabs