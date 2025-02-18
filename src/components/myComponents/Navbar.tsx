"use client"

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { ModeToggle } from './ModeToggle'
import Image from 'next/image'

const Navbar = () => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <header className='w-full fixed h-16 bg-background flex justify-between items-center shadow-lg z-20 container-responsive'>
      <div className='w-full h-full flex items-center gap-2'>
          <Image src="/logo.png" alt='logo' width={100} height={100} className='h-full object-cover dark:hidden'/>
          <Image src="/logo dark theme.png" alt='logo' width={100} height={100} className='h-full hidden object-cover dark:block'/>
      </div>
      <div className='flex w-full items-center justify-end'>
        <nav className='hidden md:flex gap-4 items-center w-full justify-end'>
          <Link href="/">Beranda</Link>
          <Link href="/catalog">Katalog</Link>
          <Link href="/">Tentang Kami</Link>
          <ModeToggle />
        </nav>
        <Menu className='cursor-pointer md:hidden' onClick={() => setIsOpened(true)} />
      </div>

      {/* mobile sidebar */}
      <div className={`fixed top-0 left-0 w-full h-screen bg-background p-6 flex flex-col justify-between gap-4 transition-all duration-500 ease-in-out transform ${isOpened ? "translate-x-0" : "translate-x-full"} md:hidden`}>
        <X onClick={() => setIsOpened(false)}/>
        <nav className='flex flex-col gap-1 w-full text-xl font-bold'>
          <p className='text-sm font-light'>Menu</p>
          <Link href="/" onClick={() => setIsOpened(false)}>Beranda</Link>
          <hr/>
          <Link href="/" onClick={() => setIsOpened(false)}>Katalog</Link>
          <hr/>
          <Link href="/" onClick={() => setIsOpened(false)}>Tentang Kami</Link>
          <hr/>
        </nav>
        <ModeToggle />
      </div>
    </header>
  )
}

export default Navbar