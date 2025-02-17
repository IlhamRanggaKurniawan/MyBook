import React from 'react'
import BookCard from '../card/BookCard'

const books = [
    {
        image: "/academy crypto1.png",
        name: "Mastering Altcoins",
        author: "Academy Crypto"
    },
    {
        image: "/academy crypto2.png",
        name: "Crypto Trading Psychology",
        author: "Academy Crypto"
    },
    {
        image: "/academy crypto3.png",
        name: "Crypto Trading Principles",
        author: "Academy Crypto"
    },
    {
        image: "/academy crypto4.png",
        name: "Crypto Trading Guide",
        author: "Academy Crypto"
    },
    {
        image: "/academy crypto5.png",
        name: "Crypto Smart Money",
        author: "Academy Crypto"
    },
    {
        image: "/security analysis.png",
        name: "Security Analysis",
        author: "Benjamin Graham"
    },
    {
        image: "/the intelligent investor.png",
        name: "The Intelligent Investor",
        author: "Benjamin Graham"
    },
    {
        image: "/psychology of money.png",
        name: "Psychology Of Money",
        author: "Morgan Housel"
    },
]

const FeaturedBooksSection = () => {
    return (
        <section className='py-20 space-y-8 container-responsive'>
            <h4 className='text-3xl text-center font-semibold'>Featured Books</h4>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4'>
                {books.map((book) => (
                    <BookCard name={book.name} author={book.author} image={book.image} key={book.image} />
                ))}
            </div>
        </section>
    )
}

export default FeaturedBooksSection