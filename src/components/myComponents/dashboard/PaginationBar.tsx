"use client"

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import React from 'react'

const PaginationBar = ({ totalData, currentPage }: { totalData: number, currentPage: number }) => {
    const totalPage = Math.ceil(totalData / 10)
    const router = useRouter()

    const handleClick = (page: number) => {
        router.push(`?page=${page}`)
    }

    return (
        <Card className='bg-background p-3 sm:p-4'>
            <div className='flex items-center justify-between'>
                <p className='hidden sm:block'>Showing {(currentPage - 1) * 10 + 1} to {Math.min(currentPage * 10, totalData)} of {totalData} results</p>
                <div className='flex gap-1 justify-end w-full sm:w-fit sm:gap-4'>
                    {currentPage > 2 && <Button variant={"outline"} onClick={() => handleClick(1)}>1</Button>}
                    {currentPage > 1 && <Button variant={"outline"} onClick={() => handleClick(currentPage - 1)}>{currentPage - 1}</Button>}
                    <Button variant={"default"} onClick={() => handleClick(currentPage)}>{currentPage}</Button>
                    {currentPage < totalPage && <Button variant={"outline"} onClick={() => handleClick(currentPage + 1)}>{currentPage + 1}</Button>}
                    {currentPage < totalPage - 1 && <Button variant={"outline"} onClick={() => handleClick(totalPage)}>{totalPage}</Button>}
                </div>
            </div>
        </Card>
    )
}

export default PaginationBar