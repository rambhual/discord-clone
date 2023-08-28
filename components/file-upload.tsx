"use client";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";

import React from "react";
import { X } from "lucide-react";

interface FileUploadProps {
  endpont: "serverImage" | "messageFile";
  value: string;
  onChange: (url?: string) => void;
}
export default function FileUpload({
  endpont,
  value,
  onChange,
}: FileUploadProps) {
  const fileType = value.split(".").pop();
  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image src={value} alt="uploader" className="rounded-full" fill />
        <button
          onClick={() => onChange("")}
          type="button"
          className="absolute bg-rose-500 text-white p-1 rounded-full top-0 right-0 shadow-sm"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }
  return (
    <UploadDropzone
      endpoint="serverImage"
      onClientUploadComplete={(res) => {
        onChange(res?.at(0)?.url);
      }}
      onUploadError={(error: Error) => {
        console.log(error.message);
      }}
    />
  );
}
