"use client"

import React, { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Category } from '@prisma/client'
import axios from 'axios'

const CategorySelect = ({ setSelectedCategory }: { setSelectedCategory: React.Dispatch<React.SetStateAction<string>> }) => {
    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        const fetch = async () => {
            const { data } = await axios.get("/api/category")
            setCategories(data)
        }

        fetch()
    }, [])

    const handleChange = (value : string) => {
        if(value === "none") {
            return setSelectedCategory("")
        }

        setSelectedCategory(value)
    }

    return (
        <Select onValueChange={handleChange}>
            <SelectTrigger>
                <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value='none'>All Categories</SelectItem>
                {categories && categories.map((category) => (
                    <SelectItem value={category.name} key={category.id}>{category.name}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default CategorySelect