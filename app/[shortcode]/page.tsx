import prisma from '@/lib/db'
import { redirect } from 'next/navigation'

interface redirectPageProps {
    params: {
        shortcode: string
    }
}
export default async function redirectPage({params}: redirectPageProps) {
    const {shortcode} = params

    const url = await prisma.url.findUnique({
        where: {shortUrl: shortcode}
    })
    if(!url) {
        return (
            redirect('/')
        )
    }

    await prisma.url.update({
        where: {id: url.id},
        data: {views: url.views + 1}
    })

    redirect(url.originalUrl)
}
