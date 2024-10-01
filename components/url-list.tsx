'use client';
import { CheckIcon, CopyIcon, EyeIcon } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { useState } from 'react';
import { QrCodeDialog } from './QrCodeDialog';

interface UrlListProps {
  urls: any[];
}

export default function UrlList({ urls }: UrlListProps) {
  const [copy, setCopy] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    const fullURI = shortnerUrl(code);
    navigator.clipboard.writeText(fullURI);
    setCopy(code);

    setTimeout(() => {
      setCopy(null);
    }, 10000);
  };

  const shortnerUrl = (code: string) => {
    return `${process.env.NEXT_PUBLIC_BASE_URL}/${code}`;
  };

  return (
    <ul>
      {urls.map((url) => (
        <li
          key={url.shortUrl}
          className="flex my-2 items-center justify-between gap-2 border-[1px] border-slate-200 rounded-md p-2"
        >
          <div className="w-1/2">
            <Link className="text-blue-500" target="_blank" href={shortnerUrl(url.shortUrl)}>
              {shortnerUrl(url.shortUrl)}
            </Link>
          </div>
          <div className="flex items-center w-1/2 justify-end">
            <QrCodeDialog shortUrl={url.shortUrl} />

            <Button
              onClick={() => handleCopy(url.shortUrl)}
              className="text-muted-foreground hover:bg-muted"
              variant="ghost"
              size="icon"
            >
              {copy === url.shortUrl ? <CheckIcon className="w-4 h-4" /> : <CopyIcon className="w-4 h-4" />}
              <span className="sr-only">Copy</span>
            </Button>
            <span className="flex items-center gap-2">
              <EyeIcon className="w-4 h-4" />
              {url.views} view{url.views !== 1 ? 's' : ''}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
