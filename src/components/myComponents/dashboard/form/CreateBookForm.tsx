"use client"

import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import CategorySelect from '../../CategorySelect'

const CreateBookForm = () => {
    const [file, setFile] = useState<File | null>(null)
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [publisher, setPublisher] = useState("")
    const [isbn, setIsbn] = useState("")
    const [pages, setPages] = useState(0)
    const [category, setCategory] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            setError("")
            setLoading(true)

            if (!file) {
                return setError("Please select a valid file.")
            }

            const formData = new FormData();
            formData.append("file", file);
            formData.append("title", title);
            formData.append("publisher", publisher);
            formData.append("author", author);
            formData.append("isbn", isbn);
            formData.append("pages", pages.toString());
            formData.append("categoryName", category);


            await axios.post(`/api/books`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })

            router.push("/dashboard")
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data.error) {
                setError(`Create book failed failed: ${error.response.data.error}`);
            } else {
                setError("An unexpected error occurred.");
            }
        } finally {
            setLoading(false)
        }
    }

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return setError("please fill all the fields");
        }

        const selectedFile = e.target.files[0];
        const maxSize = 10 * 1024 * 1024;
        const validImageTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];

        if (!validImageTypes.includes(selectedFile.type)) {
            setError("Hanya gambar dengan format JPG, PNG, GIF, atau WEBP yang diperbolehkan");
            setFile(null);
            return;
        }

        if (selectedFile && selectedFile.size > maxSize) {
            setError("ukuran file lebih besar dari 10MB");
            setFile(null);
            return;
        }

        setFile(selectedFile);
        setError("");
    }

    return (
        <div className='w-full h-full flex items-center justify-center '>
            <Card className='w-[400px] shadow-xl bg-background'>
                <CardHeader className='flex flex-col justify-center items-center'>
                    <CardTitle className='text-xl font-bold'>Create A New Book</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <form className='space-y-4' onSubmit={handleSubmit}>
                        <div className='space-y-1'>
                            <label htmlFor='file'>Gambar Buku</label>
                            <Input type='file' id='file' accept='image/*' name="file" required onChange={handleFileUpload} />
                        </div>
                        <div className='space-y-1'>
                            <label htmlFor='title'>Judul Buku</label>
                            <Input type='text' placeholder='title' id='title' required value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className='space-y-1'>
                            <label htmlFor='author'>Penulis Buku</label>
                            <Input type='text' placeholder='author' id='author' required value={author} onChange={(e) => setAuthor(e.target.value)} />
                        </div>
                        <div className='space-y-1'>
                            <label htmlFor='publisher'>Penerbit Buku</label>
                            <Input type='text' placeholder='publisher' id='publisher' required value={publisher} onChange={(e) => setPublisher(e.target.value)} />
                        </div>
                        <div className='space-y-1'>
                            <label htmlFor='isbn'>ISBN Buku</label>
                            <Input type='text' placeholder='isbn' id='isbn' required value={isbn} onChange={(e) => setIsbn(e.target.value)} />
                        </div>
                        <div className='space-y-1'>
                            <label htmlFor='pages'>Jumlah Halaman</label>
                            <Input type='number' placeholder='pages' id='pages' required value={pages} onChange={(e) => setPages(Number(e.target.value))} />
                        </div>
                        <div className='space-y-1'>
                            <label htmlFor='Email'>Pilih Category</label>
                            <CategorySelect setSelectedCategory={setCategory} />
                        </div>
                        <Button className='w-full' disabled={loading}>Submit</Button>
                        <p className='text-red-500'>{error}</p>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default CreateBookForm