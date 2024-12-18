"use client";

import React, { useState, useEffect } from 'react';

interface SearchCatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

async function fetchCatImage(): Promise<SearchCatImage> {
  const res = await fetch('https://api.thecatapi.com/v1/images/search');
  const result = await res.json();
  return result[0];
}

const Page = () => {
  const [catImageUrl, setCatImageUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const getInitialCatImage = async () => {
    setLoading(true);
    const catImage = await fetchCatImage();
    setCatImageUrl(catImage.url);
    setLoading(false);
  };

  useEffect(() => {
    getInitialCatImage();
  }, []);

  const handleClick = async () => {
    setLoading(true);
    const newCatImage = await fetchCatImage();
    setCatImageUrl(newCatImage.url);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">今日の猫アプリ</h1>

      {loading ? (
        <div className="animate-spin rounded-full border-t-4 border-blue-500 w-16 h-16 mb-4"></div>
      ) : (
        <img src={catImageUrl} alt="猫画像" className="w-[300px] h-auto rounded-lg shadow-lg mb-6" />
      )}

      <button
        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-600 transition duration-300"
        onClick={handleClick}
      >
        今日の猫さん
      </button>
    </div>
  );
};

export default Page;