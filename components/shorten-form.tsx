'use client'
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'

export default function ShortenForm() {
  const [url, setUrl] = useState('')
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(url)
    try {
      const response = await fetch('/api/shorten',{
        method: 'POST',
        body: JSON.stringify({url}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      await response.json()
      setUrl('')
    } catch (error) {
      console.log(error)
      
    }finally {
      // setUrl('')
    }
  }
  return (
    <form onSubmit={handleSubmit} className='mb-4'>
      <div className='space-y-4'>
        <Input value={url} onChange={(e) => setUrl(e.target.value)} type='url' required placeholder='Enter your url' />
        <Button className='w-full p-2' type='submit'>Shorten</Button>
      </div>
    </form>
  )
}
