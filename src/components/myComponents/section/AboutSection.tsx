import { Book } from 'lucide-react'
import React from 'react'
import FoundersSection from './FoundersSection'

const AboutSection = () => {
    return (
        <div className='space-y-12'>
            <div className='space-y-2'>
                <div className='flex items-center gap-3'>
                    <Book />
                    <h3 className='font-semibold text-xl'>Tentang kami</h3>
                </div>
                <p>
                    Perpustakaan My Book hadir sebagai tempat di mana ilmu pengetahuan, imajinasi, dan kreativitas bertemu dalam satu ruang. Kami percaya bahwa buku adalah jendela dunia, dan melalui perpustakaan ini, kami ingin membuka peluang bagi siapa saja untuk mengeksplorasi berbagai wawasan baru. Dengan koleksi buku yang beragam, mulai dari literatur klasik hingga buku-buku terkini dalam berbagai bidang, Perpustakaan My Book berkomitmen untuk menjadi sumber inspirasi bagi semua kalangan. Kami menyediakan ruang baca yang nyaman, layanan digital, serta berbagai program literasi yang dapat diikuti oleh pelajar, mahasiswa, hingga masyarakat umum yang ingin terus belajar.
                </p>
                <br />
                <p className='hidden lg:block'>
                    Selain menjadi pusat literasi, kami juga berperan sebagai komunitas belajar yang inklusif dan interaktif. Berbagai kegiatan seperti diskusi buku, seminar, lokakarya, hingga kelas menulis rutin kami selenggarakan untuk memperkaya wawasan serta membangun budaya membaca yang kuat di tengah masyarakat. Kami percaya bahwa dengan membaca, seseorang dapat mengembangkan pola pikir kritis, memperluas wawasan, serta mendapatkan inspirasi untuk menghadapi tantangan di masa depan.
                </p>
            </div>
            <div className='space-y-2'>
                <div className='flex items-center'>
                    <h3 className='font-semibold text-xl'>Visi kami</h3>
                </div>
                <p>
                    Visi kami adalah menjadikan Perpustakaan My Book sebagai pusat literasi dan pembelajaran yang dapat diakses oleh semua orang, tanpa batasan usia dan latar belakang. Kami ingin menciptakan lingkungan di mana membaca bukan hanya sekadar hobi, tetapi juga menjadi bagian dari gaya hidup yang membawa manfaat besar bagi perkembangan individu dan masyarakat.
                </p>
                <br />
                <p className='hidden lg:block'>
                    Dengan terus menghadirkan koleksi terbaik, mengadakan program edukatif, serta menciptakan ruang yang nyaman untuk belajar, kami berkomitmen untuk menumbuhkan generasi yang lebih cerdas, inovatif, dan siap menghadapi tantangan global. Kami percaya bahwa setiap buku memiliki kekuatan untuk mengubah hidup, dan melalui Perpustakaan My Book, kami ingin menjadi bagian dari perjalanan literasi setiap pembaca.
                </p>
            </div>
           <FoundersSection />
        </div>
    )
}

export default AboutSection