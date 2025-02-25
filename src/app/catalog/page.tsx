import BookListSection from '@/components/myComponents/section/BookListSection'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookListSection />
    </Suspense>
  )
}

export default page