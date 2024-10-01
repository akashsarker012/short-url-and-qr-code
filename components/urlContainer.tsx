'use client';
import React, { useState, useEffect } from 'react';
import ShortenForm from './shorten-form';
import UrlList from './url-list';

export default function UrlContainer() {
  const [urls, setUrls] = useState<any[]>([]);
  const [showUrlList, setShowUrlList] = useState(false);

  const fetchUrls = async () => {
    try {
      const response = await fetch('/api/urls', { cache: 'no-store' });
      const data = await response.json();
      setUrls(data.urls);
    } catch (error) {
      console.error('Error fetching URLs:', error);
    }
  };

  useEffect(() => {
    if (showUrlList) {
      fetchUrls();

      const interval = setInterval(() => {
        fetchUrls();
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [showUrlList]);

  return (
    <div>
      <ShortenForm onShorten={() => setShowUrlList(true)} />
      {showUrlList && <UrlList urls={urls} />}
    </div>
  );
}
