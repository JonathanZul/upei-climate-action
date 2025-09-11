import Image from 'next/image';
import { urlFor } from '@/lib/sanity';

type EventCardProps = {
  month: string;
  day: string;
  title: string;
  description: string;
  location: string;
  time: string;
  image: object; // Sanity image object
  white_text?: boolean;
};

export default function EventCard({
  month,
  day,
  title,
  description,
  location,
  time,
  image,
  white_text = false,
}: EventCardProps) {
  return (
    <div className="flex flex-col gap-6 border-t-4 border-primary pt-8 sm:flex-row">
      {/* Date */}
      <div className="flex w-full flex-col items-center justify-center sm:w-40">
        <p className={`font-montserrat text-3xl font-medium ${white_text ? 'text-white-text' : 'text-tertiary'}`}>
          {month}
        </p>
        <p className={`font-montserrat text-6xl font-light ${white_text ? 'text-white-text' : 'text-tertiary'}`}>
          {day}
        </p>
      </div>
      {/* Image */}
      <div className="flex-shrink-0">
        <Image
          src={urlFor(image).width(480).height(400).quality(80).url()}
          alt={`Image for ${title}`}
          width={240}
          height={200}
          className="h-[200px] w-full rounded-md object-cover sm:w-[240px]"
        />
      </div>
      {/* Details */}
      <div className="flex flex-col gap-4">
        <h3 className={`font-poppins text-xl font-bold ${white_text ? 'text-white-text' : 'text-tertiary'}`}>{title}</h3>
        <p className={`font-nunito text-base ${white_text ? 'text-white-text' : 'text-tertiary'}`}>{description}</p>
        <div>
          <p className={`font-poppins font-medium ${white_text ? 'text-white-text' : 'text-tertiary'}`}>{location}</p>
          <p className={`font-poppins text-sm font-medium ${white_text ? 'text-white-text' : 'text-tertiary'}`}>{time}</p>
        </div>
      </div>
    </div>
  );
}