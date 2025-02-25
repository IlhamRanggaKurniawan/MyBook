import { Book } from '@prisma/client'
import axios from 'axios'
import Image from 'next/image'
import React from 'react'

const page = async ({ params }: { params: Promise<{ id: number }> }) => {
  try {
    const id = (await params).id
    const res = await axios.get(`${process.env.WEBSITE_URL}/api/books/${id}`)
    const book: Book = res.data

    return (
      <div className='grid grid-cols-1 container-responsive gap-12 py-20 min-h-screen md:grid-cols-8'>
        <Image className='md:col-span-4 rounded-xl xl:col-span-3' src={book.image} alt={book.title} width={1000} height={1000} />
        <div className='md:col-span-4 space-y-4 xl:col-span-5'>
          <h1 className='text-3xl font-bold'>{book.title}</h1>
          <h3>ditulis oleh <b>{book.author}</b></h3>
          <div className='w-full h-[1px] bg-slate-200' />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:text-lg">
            <div>
              <h3 className="font-medium mb-2">Penerbit</h3>
              <p className="text-muted-foreground">{book.publisher}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Jumlah halaman</h3>
              <p className="text-muted-foreground">{book.pages}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">ISBN</h3>
              <p className="text-muted-foreground">{book.isbn}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Kategori</h3>
              <p className="text-muted-foreground">{book.categoryName ?? "Tidak Tersedia"}</p>
            </div>
          </div>
          <div className='w-full h-[1px] bg-slate-200' />
        </div>
      </div>
    )
  } catch (error) {
    return (
      <div>{(error as Error).message}</div>
    )
  }
}

export default page