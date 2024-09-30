import { useRef } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "./ui/dialog";
import { Button } from "./ui/button";
import { QrCodeIcon } from "lucide-react";
import { QRCode } from 'react-qrcode-logo';

interface QrCodeDialogProps {
  shortUrl: string;
}
export function QrCodeDialog({ shortUrl }: QrCodeDialogProps) {
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const shortnerUrl = `http://localhost:3000/${shortUrl}`;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <QrCodeIcon className="w-4 h-4" />
          <span className="sr-only">Show QR Code</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">QR Code</DialogTitle>
          <DialogDescription className="text-center">Scan this QR code to visit the shortened URL.</DialogDescription>
        </DialogHeader>
        <div ref={qrCodeRef}>
          <QRCode  value={shortnerUrl} size={256} />
        </div>
        <p className=" text-center text-sm">{shortnerUrl}</p>
        <Button >Download QR Code</Button>
        <DialogClose asChild>
          <Button  variant="ghost">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
