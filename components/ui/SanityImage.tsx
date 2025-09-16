// components/ui/SanityImage.tsx
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Define the complete Sanity image object structure
type SanityImageObject = {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  alt?: string;
};

// A helper function to calculate the object-position CSS value from the hotspot data
const getObjectPosition = (hotspot: { x: number; y: number } | null | undefined): string => {
  if (!hotspot?.x || !hotspot?.y) {
    return '50% 50%'; // Default to center-center if no hotspot is defined
  }
  const x = Math.round(hotspot.x * 100);
  const y = Math.round(hotspot.y * 100);
  return `${x}% ${y}%`;
};

// Type guard to check if the image has the expected structure
const isSanityImageObject = (image: unknown): image is SanityImageObject => {
  return (
    typeof image === 'object' &&
    image !== null &&
    '_type' in image &&
    (image as SanityImageObject)._type === 'image' &&
    'asset' in image &&
    typeof (image as SanityImageObject).asset === 'object' &&
    (image as SanityImageObject).asset !== null
  );
};

type SanityImageProps = {
  image: SanityImageSource | SanityImageObject; // Accept both types for flexibility
  alt: string;
  width?: number; // The width to request from the CDN
  height?: number; // The height to request from the CDN
  className?: string; // Classes for the <Image> component itself
  priority?: boolean;
};

export default function SanityImage({
  image,
  alt,
  width = 800,
  height = 600,
  className,
  priority = false,
}: SanityImageProps) {
  // Check if we have a valid Sanity image object
  if (!isSanityImageObject(image) && !image) {
    // Render a placeholder if the image is missing or invalid
    return <div className={`bg-gray-200 ${className}`} />;
  }

  // Get object position from hotspot if it exists
  const objectPosition = isSanityImageObject(image) 
    ? getObjectPosition(image.hotspot) 
    : '50% 50%';

  return (
    <Image
      src={urlFor(image).width(width).height(height).quality(80).fit('crop').url()}
      alt={alt}
      width={width} // Layout width (can be different from requested width)
      height={height} // Layout height
      className={className}
      style={{ objectPosition }} // Dynamically set the object-position for smart cropping
      priority={priority}
    />
  );
}