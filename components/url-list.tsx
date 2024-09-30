// import Link from "next/link";
// import React from "react";
// import { Button } from "./ui/button";
// import { CheckIcon, CopyIcon, EyeIcon } from "lucide-react";
// import axios from "axios";

// export default async function  UrlList() {
//   let data = await fetch('http://localhost:3000/api/urls')
  
//   let posts = await data.json()
//   console.log(posts);
  
  
//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-2">Recent url</h2>
//       <ul className="space-y-2 ">
//       {posts.map((post: any) => (
//         <li key={post.id}>{post.title}</li>
//       ))}
//         {/* <li className="flex items-center justify-between gap-2 border-[1px] border-slate-200 rounded-md p-2">
//           <Link className="text-blue-500" target="_blank" href="https://www.google.com">https://www.google.com</Link>
//           <div className="flex items-center">
//             <Button
//               className="text-muted-foreground hover:bg-muted"
//               variant="ghost"
//               size="icon">
//               <CopyIcon className="w-4 h-4" />
//               <span className="sr-only">Copy</span>
//             </Button>
//             <span className="flex items-center">
//                 <EyeIcon className="w-4 h-4" />
//                 100 view
//             </span>
//           </div>
//         </li> */}
//       </ul>
//     </div>
//   );
// }
'use server'
import { CopyIcon, EyeIcon } from 'lucide-react';
import { revalidatePath } from 'next/cache'
import { Button } from './ui/button';
import Link from 'next/link';

export default async function UrlList() {

  const shortnerUrl = (code: string) => {
    return `localhost:3000/${code}`
  }



const response = await fetch('http://localhost:3000/api/urls' ,{ cache: 'no-store' });
const data = await response.json();
revalidatePath('/',)
  const urls = data.urls;
  console.log(urls);

  return (
    <ul>
      {urls.map((url: any) => (
      <li className="flex items-center justify-between gap-2 border-[1px] border-slate-200 rounded-md p-2">
        <div>
      <Link className="text-blue-500" target="_blank" href={shortnerUrl(url.code)}>{shortnerUrl(url.shortUrl)}</Link>
        </div>
          <div className="flex items-center">
            <Button
              className="text-muted-foreground hover:bg-muted"
              variant="ghost"
              size="icon">
              <CopyIcon className="w-4 h-4" />
              <span className="sr-only">Copy</span>
            </Button>
            <span className="flex items-center gap-2">
                <EyeIcon className="w-4 h-4" />
                {url.views} view
            </span>
          </div>
        </li>
       ))} 
    </ul>
  );
}
