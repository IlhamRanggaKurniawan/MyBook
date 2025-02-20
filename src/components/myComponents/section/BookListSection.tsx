import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
import BookCard from '../card/BookCard'

const BookListSection = () => {
  return (
    <div className='container-responsive py-20'>
      <div className='flex gap-2 pt-8 xl:w-[50%]'>
        <Input placeholder='Search Books....' />
        <Button className='px-8'>Search</Button>
      </div>
      <div className='grid grid-cols-1 gap-6 py-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        <BookCard name="Value Investing" author="Academy Crypto" image="/academy crypto1.png" />
        <BookCard name="Value Investing" author="Academy Crypto" image="/academy crypto1.png" />
        <BookCard name="Value Investing" author="Academy Crypto" image="/academy crypto1.png" />
        <BookCard name="Value Investing" author="Academy Crypto" image="/academy crypto1.png" />
        <BookCard name="Value Investing" author="Academy Crypto" image="/academy crypto1.png" />
        <BookCard name="Value Investing" author="Academy Crypto" image="/academy crypto1.png" />
        <BookCard name="Value Investing" author="Academy Crypto" image="/academy crypto1.png" />
        <BookCard name="Value Investing" author="Academy Crypto" image="/academy crypto1.png" />
        <BookCard name="Value Investing" author="Academy Crypto" image="/academy crypto1.png" />
        <BookCard name="Value Investing" author="Academy Crypto" image="/academy crypto1.png" />
        <BookCard name="Value Investing" author="Academy Crypto" image="/academy crypto1.png" />
        <BookCard name="Value Investing" author="Academy Crypto" image="/academy crypto1.png" />
        <BookCard name="Value Investing" author="Academy Crypto" image="/academy crypto1.png" />
        <BookCard name="Value Investing" author="Academy Crypto" image="/academy crypto1.png" />
        <BookCard name="Value Investing" author="Academy Crypto" image="/academy crypto1.png" />
        <BookCard name="Value Investing" author="Academy Crypto" image="/academy crypto1.png" />
        <BookCard name="Value Investing" author="Academy Crypto" image="/academy crypto1.png" />
        <BookCard name="Value Investing" author="Academy Crypto" image="/academy crypto1.png" />
        <BookCard name="Value Investing" author="Academy Crypto" image="/academy crypto1.png" />
        <BookCard name="Value Investing" author="Academy Crypto" image="/academy crypto1.png" />
        <BookCard name="Value Investing" author="Academy Crypto" image="/academy crypto1.png" />
        <BookCard name="Value Investing" author="Academy Crypto" image="/academy crypto1.png" />
        <BookCard name="Value Investing" author="Academy Crypto" image="/academy crypto1.png" />
        <BookCard name="Value Investing" author="Academy Crypto" image="/academy crypto1.png" />
        <BookCard name="Value Investing" author="Academy Crypto" image="/academy crypto1.png" />
        <BookCard name="Value Investing" author="Academy Crypto" image="/academy crypto1.png" />
        <BookCard name="Value Investing" author="Academy Crypto" image="/academy crypto1.png" />
        <BookCard name="Value Investing" author="Academy Crypto" image="/academy crypto1.png" />
        <BookCard name="Value Investing" author="Academy Crypto" image="/academy crypto1.png" />
        <BookCard name="Value Investing" author="Academy Crypto" image="/academy crypto1.png" />
        <BookCard name="Value Investing" author="Academy Crypto" image="/academy crypto1.png" />
        <BookCard name="Value Investing" author="Academy Crypto" image="/academy crypto1.png" />
      </div>
    </div>
  )
}

export default BookListSection