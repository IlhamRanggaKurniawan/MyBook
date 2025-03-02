import BooksTabs from '@/components/myComponents/dashboard/tabs/BooksTabs'
import LoansTabs from '@/components/myComponents/dashboard/tabs/LoansTabs'
import StudentsTabs from '@/components/myComponents/dashboard/tabs/StudentsTabs'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'

const page = () => {
    return (
        <div className='p-8'>
            <h2 className='text-3xl font-bold'>Dashboard</h2>
            <Tabs defaultValue='students' className='py-4'>
                <TabsList>
                    <TabsTrigger value='students'>Students</TabsTrigger>
                    <TabsTrigger value='books'>Books</TabsTrigger>
                    <TabsTrigger value='loans'>Loans</TabsTrigger>
                </TabsList>
                <StudentsTabs />
                <BooksTabs />
                <LoansTabs />
            </Tabs>
        </div>
    )
}

export default page