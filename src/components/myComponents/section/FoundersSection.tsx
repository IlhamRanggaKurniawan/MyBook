import { Github, Instagram, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const FoundersSection = () => {
    return (
        <div className='space-y-4'>
            <div className='flex items-center gap-3'>
                <Users />
                <h3 className='font-semibold text-2xl'>Kenali Pendiri Kami</h3>
            </div>
            <div className='space-y-4'>
                <div className='grid grid-cols-1 gap-10 md:grid-cols-2'>
                    <Image src="/Ilham.jpg" alt='' width={1000} height={1000} quality={100} className='w-full object-cover aspect-square rounded-xl' />
                    <div className='space-y-6'>
                        <h4 className='font-semibold text-xl'>Ilham Rangga Kurniawan</h4>
                        <p >
                            Saya adalah seorang fullstack developer yang berfokus pada Next.js, React, Golang, dan Express.js. Saat ini, saya bersekolah di SMK Negeri 1 Wonosobo jurusan Rekayasa Perangkat Lunak. Saya sudah memiliki pengalaman dalam pengembangan web, termasuk pembuatan aplikasi media sosial fullstack dan beberapa proyek freelance dengan implementasi desain dari Figma.
                        </p>
                        <p >
                            saya melihat pemrograman sebagai cara untuk memecahkan masalah dan menciptakan sesuatu yang bermanfaat. Saya selalu tertarik untuk mengeksplorasi teknologi baru dan mencari solusi yang lebih efisien dalam pengembangan web. Bagi saya, setiap proyek adalah kesempatan untuk belajar dan berkembang, baik dalam keterampilan teknis maupun pemahaman tentang bagaimana teknologi dapat digunakan untuk membantu banyak orang.
                        </p>
                        <div className='flex gap-4'>
                            <Link target='_blank' href={"https://github.com/IlhamRanggaKurniawan"} className='w-10 h-10 rounded-md border border-primary'>
                                <Github className='m-auto h-full' />
                            </Link>
                            <Link target='_blank' href={"https://www.instagram.com/ilham_rku/"} className='w-10 h-10 rounded-md border border-primary'>
                                <Instagram className='m-auto h-full' />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-1 gap-10 md:grid-cols-2'>
                    <div className='space-y-6'>
                        <h4 className='font-semibold text-xl'>Danish Dhiahurrahman</h4>
                        <p >
                            Halo semuanya! Nama saya Danish Dhiahurrahman, seorang siswa kelas 10 yang memiliki minat besar dalam teknologi dan pengembangan aplikasi. Saya sangat tertarik dengan bagaimana teknologi dapat membantu mempermudah kehidupan kita sehari-hari, dan itulah yang mendorong saya untuk membuat Website ini.
                        </p>
                        <p >
                            Selain itu, saya juga senang belajar hal-hal baru, terutama yang berkaitan dengan pemrograman, kecerdasan buatan, dan desain antarmuka pengguna. Saya percaya bahwa dengan menguasai teknologi, kita dapat menciptakan solusi inovatif untuk berbagai permasalahan di sekitar kita. Di waktu luang, saya sering mengeksplorasi berbagai bahasa pemrograman, mengembangkan proyek kecil, serta mengikuti perkembangan terbaru di dunia teknologi. Saya berharap melalui website ini, saya bisa berbagi ilmu, pengalaman, dan inspirasi kepada orang lain yang memiliki ketertarikan serupa.
                        </p>
                        <div className='flex gap-4'>
                            <Link target='_blank' href={"https://github.com/masDanish"} className='w-10 h-10 rounded-md border border-primary'>
                                <Github className='m-auto h-full' />
                            </Link>
                            <Link target='_blank' href={"https://www.instagram.com/masdan1sh/"} className='w-10 h-10 rounded-md border border-primary'>
                                <Instagram className='m-auto h-full' />
                            </Link>
                        </div>
                    </div>
                    <Image src="/Danish.jpg" alt='' width={1000} height={1000} quality={100} className='w-full object-cover aspect-square rounded-xl order-first md:order-last' />
                </div>
            </div>
        </div>
    )
}

export default FoundersSection