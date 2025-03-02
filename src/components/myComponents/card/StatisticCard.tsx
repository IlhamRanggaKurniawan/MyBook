import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { LucideProps } from 'lucide-react'
import React from 'react'

const StatisticCard = ({ title, amount, Icon }: { title: string, amount: number, Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>> }) => {
    return (
        <Card className='bg-background'>
            <CardHeader>
                <Button className='w-12 h-12' variant={'outline'} >
                    <Icon />
                </Button>
            </CardHeader>
            <CardContent>
                <p className='text-card-foreground'>{title}</p>
                <p className='text-3xl font-semibold'>{amount}</p>
            </CardContent>
        </Card>
    )
}

export default StatisticCard