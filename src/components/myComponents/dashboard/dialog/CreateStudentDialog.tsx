"use client"

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { Plus } from 'lucide-react'
import React, { FormEvent, useState } from 'react'

const CreateStudentDialog = () => {
    const [name, setName] = useState("")
    const [studentClass, setStudentClass] = useState("")
    const [NIS, setNIS] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            setLoading(true)

            await axios.post("/api/students", {
                name,
                nis: NIS?.toString(),
                class: studentClass
            })

            window.location.reload()
        } catch (error) {
            console.log(error)
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
                    <p className='hidden sm:block'>Create A New Student</p>
                    <Plus className='sm:hidden' />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create A New Student</DialogTitle>
                </DialogHeader>
                <form className='space-y-4' onSubmit={handleSubmit}>
                    <div className='space-y-2'>
                        <label htmlFor='name'>Nama siswa</label>
                        <Input id='name' required value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='space-y-2'>
                        <label htmlFor='class'>Kelas Siswa</label>
                        <Input id='class' required value={studentClass} onChange={(e) => setStudentClass(e.target.value)} />
                    </div>
                    <div className='space-y-2'>
                        <label htmlFor='nis'>NIS siswa</label>
                        <Input id='nis' type='number' required onChange={(e) => setNIS(e.target.value)} />
                    </div>
                    <div className='w-full flex justify-end'>
                        <Button disabled={loading || (!name && !studentClass && !NIS)}>Submit</Button>
                    </div>
                    <p className='text-red-500'>{error}</p>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateStudentDialog