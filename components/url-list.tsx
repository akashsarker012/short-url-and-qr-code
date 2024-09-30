'use client';
import { CheckIcon, CopyIcon, EyeIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { QrCodeDialog } from "./QrCodeDialog"; // Import the new QrCodeDialog component

export default function UrlList() {
  const [urls, setUrls] = useState<any[]>([]);
  const [copy, setCopy] = useState<string | null>(null);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/urls", {
          cache: "no-store",
        });
        const data = await response.json();
        setUrls(data.urls);
      } catch (error) {
        console.error("Error fetching URLs:", error);
      }
    };

    fetchUrls();

    const interval = setInterval(() => {
      fetchUrls();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleCopy = (code: string) => {
    const fullURI = shortnerUrl(code);
    navigator.clipboard.writeText(fullURI);
    setCopy(code);

    setTimeout(() => {
      setCopy(null);
    }, 2000);
  };

  const shortnerUrl = (code: string) => {
    return `http://localhost:3000/${code}`;
  };

  return (
    <ul>
      {urls.map((url) => (
        <li
          key={url.shortUrl}
          className="flex items-center justify-between gap-2 border-[1px] border-slate-200 rounded-md p-2"
        >
          <div>
            <Link
              className="text-blue-500"
              target="_blank"
              href={shortnerUrl(url.shortUrl)}
            >
              {shortnerUrl(url.shortUrl)}
            </Link>
          </div>
          <div className="flex items-center ">
            <QrCodeDialog shortUrl={url.shortUrl} />

            <Button
              onClick={() => handleCopy(url.shortUrl)}
              className="text-muted-foreground hover:bg-muted"
              variant="ghost"
              size="icon"
            >
              {copy === url.shortUrl ? (
                <CheckIcon className="w-4 h-4" />
              ) : (
                <CopyIcon className="w-4 h-4" />
              )}
              <span className="sr-only">Copy</span>
            </Button>
            <span className="flex items-center gap-2">
              <EyeIcon className="w-4 h-4" />
              {url.views} view{url.views !== 1 ? "s" : ""}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
