import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type BookCardProps = {
  id: string,
  image: string,
  name: string,
  author: string
}

const BookCard = ({ image, name, author, id }: BookCardProps) => {
  return (
    <Link href={`/book/${id}`} className='rounded-lg flex flex-col overflow-hidden border-2 cursor-pointer'>
      <Image src={image} alt={name} width={1000} height={1000} className='w-full h-full aspect-square object-contain' />
      <div className='py-2 px-4 border-t-2 bg-background'>
        <h4 className='text-xl font-semibold'>{name}</h4>
        <p>{author}</p>
      </div>
    </Link>
  )
}

export default BookCard