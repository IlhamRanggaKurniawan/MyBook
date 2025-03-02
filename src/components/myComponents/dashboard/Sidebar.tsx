"use client"

import { Book, HandHelping, LayoutDashboard, Menu, Users, X } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { ModeToggle } from '../ModeToggle'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

const links = [
    {
        Icon: LayoutDashboard,
        href: "/dashboard",
        text: "Dashboard"
    },
    {
        Icon: Users,
        href: "/dashboard/students",
        text: "Students"
    },
    {
        Icon: Book,
        href: "/dashboard/books",
        text: "Books"
    },
    {
        Icon: HandHelping,
        href: "/dashboard/loans",
        text: "Loans"
    },
]

const Sidebar = () => {
    const pathname = usePathname()
    const [isOpened, setIsOpened] = useState(false)

    return (
        <>
            <div className='hidden bg-background fixed h-screen shadow-xl p-2 sm:w-16 sm:flex sm:flex-col sm:justify-between lg:w-52 lg:p-4 xl:w-64 xl:p-6'>
                <Link href={"/"} className='text-2xl font-semibold hidden lg:block'>My Book</Link>
                <div className='py-6 space-y-2'>
                    {links.map((link) => {
                        const isActive = link.href === pathname
                        return (
                            <Link key={link.text} href={link.href} className={`w-full h-12 flex items-center gap-3 p-4 rounded-xl ${isActive ? "bg-primary text-background" : "bg-background text-primary"}`}>
                                <link.Icon />
                                <p className='hidden lg:block'>{link.text}</p>
                            </Link>
                        )
                    })}
                </div>
                <div>
                    <ModeToggle />
                </div>
            </div>
            <div className='h-16 bg-background border-b fixed w-full container-responsive flex items-center justify-between sm:hidden'>
                <div className='h-full flex items-center gap-2'>
                    <Image src="/logo.png" alt='logo' width={100} height={100} className='h-full object-cover dark:hidden' />
                    <Image src="/logo dark theme.png" alt='logo' width={100} height={100} className='h-full hidden object-cover dark:block' />
                </div>
                <Menu className='cursor-pointer md:hidden' onClick={() => setIsOpened(true)} />
            </div>

            <div className={`fixed top-0 left-0 w-full h-screen bg-background p-6 flex flex-col justify-between gap-4 transition-all duration-500 ease-in-out transform ${isOpened ? "translate-x-0" : "translate-x-full"} md:hidden`}>
                <X onClick={() => setIsOpened(false)} />
                <nav className='flex flex-col gap-1 w-full text-xl font-bold'>
                    <p className='text-sm font-light'>Menu</p>
                    {links.map((link) => (
                        <div key={link.href}>
                            <Link href={link.href} onClick={() => setIsOpened(false)}>{link.text}</Link>
                            <hr />
                        </div>
                    ))}
                </nav>
                <ModeToggle />
            </div>
        </>
    )
}

export default Sidebar