import { upload, resolveScheme } from "thirdweb/storage";
import { type FC, useCallback ,useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { client } from "~/providers/Thirdweb";
import heic2any from "heic2any";
import { api } from "~/utils/api";

interface UploadProps {
  className?: string; // completely override classes
  additionalClasses?: string; // add classes to the default classes
  label: string;
  hoverLabel?: string;
  onUpload?: ({
    resolvedUrls,
    uris,
  } : { 
    resolvedUrls: string[], uris: string[]
  }) => void;
  onUploadError?: (error: Error) => void;
  initialUrls?: string[];
  height?: string;
  objectCover?: boolean;
  imageClassName?: string;
}

export const Upload: FC<UploadProps> = ({ 
  className,
  onUpload,
  onUploadError,
  additionalClasses,
  initialUrls,
  label,
  height,
  objectCover,
  imageClassName,
}) => {
  const [urls, setUrls] = useState<string[]>([]);
  const [dropzoneLabel, setDropzoneLabel] = useState<string>("📷 Take a picture of you eating it!");
  const safetyCheck = api.google.checkForSafety.useMutation();

  useEffect(() => {
    if (initialUrls && initialUrls.length > 0) {
      setUrls(initialUrls);
    } else {
      setUrls([]);
    }
  }, [initialUrls]);

  const conductImageSafetyCheck = useCallback(async (file: File): Promise<boolean> => {
    // convert the file to base64 image
    const reader = new FileReader();
    reader.readAsDataURL(file);
    const base64Image = await new Promise<string>((resolve) => {
      reader.onload = () => {
        console.log({ image: reader.result });
        resolve(reader.result as string);
      };
    });
    const isSafe = await safetyCheck.mutateAsync({
      base64ImageString: base64Image,
    });
    return isSafe;
  }, [safetyCheck]);

  const resizeImageFile = useCallback(async (file: File): Promise<File> => {
    if (typeof window === 'undefined') {
      throw new Error("This function can only be run in the browser");
    }
  
    const maxSize = 0.5 * 1024 * 1024; // .5MB in bytes
    const isHeic = file.type === 'image/heic' || file.type === 'image/heif';
    console.log({ isHeic, file });
  
    let imageFile = file;
  
    if (isHeic) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const heicBlob = await heic2any({ blob: file, toType: "image/jpeg" }) as Blob | Blob[];
      const heicBlobArray: Blob[] = Array.isArray(heicBlob) ? heicBlob : [heicBlob];
      imageFile = new File(heicBlobArray, file.name.replace(/\.(heic|heif)$/, ".jpg"), { type: "image/jpeg" });
    }
  
    if (imageFile.size <= maxSize) return imageFile; // Return original file if it doesn't exceed the limit
  
    const img = document.createElement('img');
    const canvas = document.createElement('canvas');
    const src = URL.createObjectURL(imageFile);
    console.log({ src });
    img.src = src;
  
    await new Promise((resolve) => {
      img.onload = resolve;
    });
  
    let quality = 0.9; // Start with high quality
    let resizedFile = imageFile;
  
    do {
      console.log('resizing at quality: ', quality);
      const ctx = canvas.getContext('2d');
      const width = img.width * quality;
      const height = img.height * quality;
      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, 0, 0, width, height);
  
      const blob = await new Promise<Blob>((resolve, reject) =>
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create blob from canvas'));
          }
        }, 'image/jpeg', quality)
      );
      resizedFile = new File([blob], imageFile.name, { type: 'image/jpeg' });
      quality -= 0.1; // Reduce quality progressively
    } while (resizedFile.size > maxSize && quality > 0.1);
  
    URL.revokeObjectURL(src);

    return resizedFile;
  }, []);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUrls([]);
    setDropzoneLabel("🖼️ Preparing upload...");

    const resizedFilesPromises = acceptedFiles.map(async (file) => {
      return await resizeImageFile(file);
    });

    const resizedFiles = await Promise.all(resizedFilesPromises);

    if (resizedFiles.length === 0) {
      onUploadError?.(new Error("No files to upload"));
      setDropzoneLabel(label);
      return;
    }

    // Check if the image is safe
    setDropzoneLabel("🕵🏻‍♂️ Checking for safety...");
    try {
      const isSafe = await conductImageSafetyCheck(resizedFiles[0]!);
      if (!isSafe) {
        onUploadError?.(new Error("Image is not safe to upload"));
        setDropzoneLabel(label);
        return;
      }
      setDropzoneLabel("✅ Image passed safety check!");
    } catch (e) {
      onUploadError?.(e as Error);
      setDropzoneLabel("❌ Error occurred while checking for safety, try another image (use .png)");
      return;
    }

    try {
      setDropzoneLabel("☁️ Uploading...");
      const uris = await upload({
        files: resizedFiles,
        client,
      });
      const resolvedUrls = typeof uris === 'string' ? [resolveScheme({
        uri: uris,
        client,
      })] : await Promise.all(uris.map(uri => (
        resolveScheme({
          uri,
          client,
        })
      )));
      setTimeout(() => setUrls(resolvedUrls), 1000);
      onUpload?.({ resolvedUrls, uris: typeof uris === 'string' ? [uris] : uris });
    } catch (e) {
      onUploadError?.(e as Error);
    } finally {
      setDropzoneLabel(label);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conductImageSafetyCheck, onUpload, onUploadError, resizeImageFile]);
  
  // eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { image: ["image/*"] }});

  useEffect(() => {
    if (isDragActive) {
      setDropzoneLabel("👋 Drop here!");
    } else {
      setDropzoneLabel(label);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragActive]);


  const previewImageSrc = (src: string) => {
    if (src.startsWith("ipfs://")) {
      return `https://ipfs.io/ipfs/${src.replace("ipfs://", "")}`;
    }
    return src;
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    <div {...getRootProps()} className={className ?? `bg-base-200 rounded-lg ${height ? height : 'h-64'} w-full grid place-content-center cursor-pointer relative ${additionalClasses ?? ""}`}>
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-call */}
      <input {...getInputProps()} />
      {
        urls.length && urls.length > 0 && urls[0] !== "" ? (
          <div className="absolute inset-0 w-full h-full bg-cover overflow-hidden rounded-lg">
            <Image
              src={previewImageSrc(urls[0]!)}
              alt="uploaded image"
              layout="fill"
              objectFit={objectCover ? "cover" : "contain"}
              className={imageClassName}
            />
          </div>
        ) : (
          <p className="px-8 text-center">{dropzoneLabel}</p>
        )
      }
    </div>
  )
};

export default Upload;