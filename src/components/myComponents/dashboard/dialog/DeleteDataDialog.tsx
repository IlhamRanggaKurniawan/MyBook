"use client"

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import axios from 'axios'
import React from 'react'

type variant = "book" | "student" | "loan"

const variantDatas = {
    book: {
        api: "/api/books"
    },
    student: {
        api: "/api/students"
    },
    loan: {
        api: "/api/loans"
    },
}

const DeleteDataDialog = ({ id, variant, children }: { id: string, variant: variant, children: React.ReactNode }) => {


    const handleClick = async () => {
        try {
            await axios.delete(`${variantDatas[variant].api}?id=${id}`)

            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete {variant}</DialogTitle>
                </DialogHeader>
                <Button variant={"destructive"} onClick={handleClick}>Delete</Button>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteDataDialog