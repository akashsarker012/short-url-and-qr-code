'use client'
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'

export default function ShortenForm() {
  const [url, setUrl] = useState('')
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }
  return (
    <form onSubmit={handleSubmit} className='mb-4'>
      <div className='space-y-4'>
        <Input type='url' required placeholder='Enter your url' />
        <Button className='w-full p-2' type='submit'>Shorten</Button>
      </div>
    </form>
  )
}
