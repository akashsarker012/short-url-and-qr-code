'use client';
import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface ShortenFormProps {
  onShorten: () => void; // Callback to trigger showing the UrlList
}

export default function ShortenForm({ onShorten }: ShortenFormProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        body: JSON.stringify({ url }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await response.json();
      setUrl('');
      onShorten(); // Show the UrlList after successful submission
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="space-y-4">
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          type="url"
          required
          placeholder="Enter your URL"
        />
        <Button className="w-full p-2" type="submit">
          Shorten
        </Button>
      </div>
    </form>
  );
}
