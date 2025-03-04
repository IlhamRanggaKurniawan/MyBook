"use client"

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import React, { FormEvent, useState } from 'react'
import { Combobox } from '../Combobox'
import axios from 'axios'

const CreateLoanDialog = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [studentId, setStudentId] = useState("")
    const [bookId, setBookId] = useState("")

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            setLoading(true)

            await axios.post("/api/loans", {
                bookId,
                studentId
            })

            window.location.reload()
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data.error) {
                setError(`Create book failed failed: ${error.response.data.error}`);
            } else {
                console.log(error)
                setError((error as Error).message);
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <p className='hidden sm:block'>Create A New Loan</p>
                    <Plus className='sm:hidden' />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create A New Student</DialogTitle>
                </DialogHeader>
                <form className='space-y-4' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='name'>Pilih Siswa</label>
                        <Combobox variant='student' setId={setStudentId} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='name'>Pilih Buku</label>
                        <Combobox variant='book' setId={setBookId} />
                    </div>
                    <div className='w-full flex justify-end'>
                        <Button disabled={loading}>Submit</Button>
                    </div>
                    <p className='text-red-500'>{error}</p>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateLoanDialog