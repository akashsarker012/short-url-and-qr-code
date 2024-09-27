import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { CheckIcon, CopyIcon, EyeIcon } from "lucide-react";

export default function UrlList() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Recent url</h2>
      <ul className="space-y-2 ">
        <li className="flex items-center justify-between gap-2 border-[1px] border-slate-200 rounded-md p-2">
          <Link className="text-blue-500" target="_blank" href="https://www.google.com">https://www.google.com</Link>
          <div className="flex items-center">
            <Button
              className="text-muted-foreground hover:bg-muted"
              variant="ghost"
              size="icon">
              <CopyIcon className="w-4 h-4" />
              <span className="sr-only">Copy</span>
            </Button>
            <span className="flex items-center">
                <EyeIcon className="w-4 h-4" />
                100 view
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
}
