import BookCard from '@/components/myComponents/card/BookCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

const page = () => {
  return (
    <div className='container-responsive py-20'>
      <div className='flex w-[50%] gap-8 pt-8'>
        <Input placeholder='Search Books....' />
        <Button className='px-8'>Search</Button>
      </div>
      <div className='grid grid-cols-4 gap-6 py-16'>
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

export default page