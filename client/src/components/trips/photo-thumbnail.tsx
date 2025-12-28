import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/queryClient";

interface PhotoThumbnailProps {
  photo: any;
  className?: string;
}

export default function PhotoThumbnail({ photo, className }: PhotoThumbnailProps) {
  const [src, setSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function resolve() {
      if (!photo) return;
      const value = photo.imageUrl;
      // If already a full URL or data URL, use directly
      if (!value) {
        setSrc(null);
        return;
      }

      console.debug('[PhotoThumbnail] resolving photo', photo.id, value);

      try {
        if (typeof value === 'string' && (/^data:/i.test(value) || /^https?:\/\//i.test(value) || value.includes('/storage/v1/object/public/'))) {
          setSrc(value);
          return;
        }

        // Use server redirect endpoint which will redirect the browser to the signed/public URL
        setLoading(true);
        const rawUrl = `/api/photos/${photo.id}/raw`;
        setSrc(rawUrl);
        return;

        setSrc(null);
      } catch (err) {
        console.error('Failed to resolve photo url', err);
        setSrc(null);
      } finally {
        setLoading(false);
      }
    }

    resolve();
    return () => { cancelled = true; };
  }, [photo]);

  if (!photo) return null;

  return (
    <div className={className || "relative rounded-lg overflow-hidden aspect-square group bg-gray-100"}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400" />
        </div>
      )}
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={photo.caption || 'Travel memory'} className="w-full h-full object-cover" />
      ) : (
        <div className="flex items-center justify-center h-full p-4 text-gray-500">
          <span>Travel memory</span>
        </div>
      )}
    </div>
  );
}
