"use client"

import React, { FormEvent, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

const HeroCTA = () => {
    const [search, setSearch] = useState("")
    const router = useRouter()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        router.push(`/catalog?search=${search}`)
    }

    return (
        <form className='flex gap-2 w-full max-w-96 item' onSubmit={handleSubmit}>
            <Input placeholder='Search Books...' onChange={(e) => setSearch(e.target.value)}/>
            <Button>
                <Search />
                Search
            </Button>
        </form>
    )
}

export default HeroCTA