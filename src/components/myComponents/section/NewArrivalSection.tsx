import React from 'react'
import BookCarousel from '../BookCarousel'

const NewArrivalSection = () => {
    return (
        <section className='py-20 space-y-8 bg-card container-responsive'>
            <h4 className='text-3xl text-center font-semibold'>Buku terbaru</h4>
            <div className='w-full flex items-center justify-center'>
                <BookCarousel />
            </div>
        </section>
    )
}

export default NewArrivalSection