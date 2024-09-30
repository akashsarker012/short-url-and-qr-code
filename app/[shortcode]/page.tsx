import prisma from '@/lib/db'
import { redirect } from 'next/navigation'
// import { redirect } from 'next/navigation'
import React from 'react'

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
        return <div>Not found</div>
    }
    await prisma.url.update({
        where: {id: url.id},
        data: {views: url.views + 1}
    })

    redirect(url.originalUrl)
}
