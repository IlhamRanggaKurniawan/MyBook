import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'

const MostPopularBookCard = () => {
    return (
        <Card className='col-span-4 bg-background'>
            <CardHeader>
                <h2 className='text-xl font-semibold'>Most Popular Books</h2>
            </CardHeader>
            <CardContent className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
                <div className='space-y-2'>
                    <Image src={"/academy crypto1.png"} alt='tes' width={1000} height={1000} className='aspect-[16/11] object-cover rounded-md'/>
                    <h3 className='text-lg font-normal'>Mastering Altcoins</h3>
                    <p className='text-slate-500'>Borrowed 5 times</p>
                </div>
                <div className='space-y-2'>
                    <Image src={"/academy crypto1.png"} alt='tes' width={1000} height={1000} className='aspect-[16/11] object-cover rounded-md'/>
                    <h3 className='text-lg font-normal'>Mastering Altcoins</h3>
                    <p className='text-slate-500'>Borrowed 5 times</p>
                </div>
                <div className='space-y-2'>
                    <Image src={"/academy crypto1.png"} alt='tes' width={1000} height={1000} className='aspect-[16/11] object-cover rounded-md'/>
                    <h3 className='text-lg font-normal'>Mastering Altcoins</h3>
                    <p className='text-slate-500'>Borrowed 5 times</p>
                </div>
                <div className='space-y-2'>
                    <Image src={"/academy crypto1.png"} alt='tes' width={1000} height={1000} className='aspect-[16/11] object-cover rounded-md'/>
                    <h3 className='text-lg font-normal'>Mastering Altcoins</h3>
                    <p className='text-slate-500'>Borrowed 5 times</p>
                </div>
            </CardContent>
        </Card>
    )
}

export default MostPopularBookCard