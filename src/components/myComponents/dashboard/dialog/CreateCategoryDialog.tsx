"use client"

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import React, { FormEvent, useState } from 'react'

const CreateCategoryDialog = () => {
    const [category, setCategory] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            setLoading(true)

            await axios.post("/api/categories", {
                name: category
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
                    <p>Create A New Book Category</p>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create A New Student</DialogTitle>
                </DialogHeader>
                <form className='space-y-4' onSubmit={handleSubmit}>
                    <div className='space-y-2'>
                        <label htmlFor='category'>Nama Kategori</label>
                        <Input id='category' required value={category} onChange={(e) => setCategory(e.target.value)} />
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

export default CreateCategoryDialog