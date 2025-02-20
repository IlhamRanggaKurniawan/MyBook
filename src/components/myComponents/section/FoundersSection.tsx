import { Users } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const FoundersSection = () => {
    return (
        <div className='space-y-4'>
            <div className='flex items-center gap-3'>
                <Users />
                <h3 className='font-semibold text-2xl'>Meet Our Founders</h3>
            </div>
            <div className='space-y-4'>
                <div className='grid grid-cols-1 gap-10 md:grid-cols-2'>
                    <Image src="/Ilham.jpg" alt='' width={1000} height={1000} quality={100} className='w-full object-cover aspect-square rounded-xl' />
                    <div className='space-y-6'>
                        <h4 className='font-semibold text-xl'>Ilham Rangga Kurniawan</h4>
                        <p >Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae illo error reprehenderit, officiis explicabo magni expedita at cupiditate veritatis repudiandae obcaecati asperiores sint incidunt reiciendis quisquam quas. Harum illum magni quos earum perspiciatis! Ducimus iure sapiente quo maxime excepturi eligendi expedita, aliquam corrupti quia placeat, libero error saepe quam soluta id inventore, sunt perspiciatis impedit cumque ipsum laboriosam non molestiae. Adipisci exercitationem reprehenderit error officia sint voluptates doloribus repellendus quam quaerat quos sapiente consequuntur rerum facilis temporibus numquam dignissimos, a expedita amet maiores quod autem dolorum pariatur? Ipsa porro voluptas suscipit hic in quibusdam cumque, molestias rem nemo labore pariatur!</p>
                    </div>
                </div>
                <div className='grid grid-cols-1 gap-10 md:grid-cols-2'>
                    <div className='space-y-6'>
                        <h4 className='font-semibold text-xl'>Danish Dhiahurrahman</h4>
                        <p >Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae illo error reprehenderit, officiis explicabo magni expedita at cupiditate veritatis repudiandae obcaecati asperiores sint incidunt reiciendis quisquam quas. Harum illum magni quos earum perspiciatis! Ducimus iure sapiente quo maxime excepturi eligendi expedita, aliquam corrupti quia placeat, libero error saepe quam soluta id inventore, sunt perspiciatis impedit cumque ipsum laboriosam non molestiae. Adipisci exercitationem reprehenderit error officia sint voluptates doloribus repellendus quam quaerat quos sapiente consequuntur rerum facilis temporibus numquam dignissimos, a expedita amet maiores quod autem dolorum pariatur? Ipsa porro voluptas suscipit hic in quibusdam cumque, molestias rem nemo labore pariatur!</p>
                    </div>
                    <Image src="/Danish.jpg" alt='' width={1000} height={1000} quality={100} className='w-full object-cover aspect-square rounded-xl order-first md:order-last' />
                </div>
            </div>
        </div>
    )
}

export default FoundersSection