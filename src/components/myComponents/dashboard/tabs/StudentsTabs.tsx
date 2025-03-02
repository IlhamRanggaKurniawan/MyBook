"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TabsContent } from '@/components/ui/tabs'
import { EllipsisVertical } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import PaginationBar from '../PaginationBar'
import { Student } from '@prisma/client'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'

const StudentsTabs = () => {
    const [students, setStudents] = useState<Student[]>([])
    const [totalStudent, setTotalStudent] = useState<number>(0)
    const searchParams = useSearchParams()
    const page = Number(searchParams.get("page")) || 1

    useEffect(() => {
        const fetchStudents = async () => {
            const { data } = await axios.get(`/api/students?page=${page}`)

            setStudents(data)
        }

        fetchStudents()
    }, [page])

    useEffect(() => {
        const fetch = async () => {

            const { data } = await axios.get(`/api/students/count`)

            setTotalStudent(data)
        }

        fetch()
    }, [])

    return (
        <TabsContent value='students' className='space-y-8'>
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
                            <TableCell><EllipsisVertical /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <PaginationBar totalData={totalStudent} currentPage={page} />
        </TabsContent>
    )
}

export default StudentsTabs