import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import SanityImage from './SanityImage';
import {type FormattedEvent} from '@/app/events/shared'
import test from 'node:test';

type EventCardProps = {
  event: FormattedEvent;
  white_text?: boolean;
};

export default function EventCard({
  event,
  white_text = false,
}: EventCardProps) {
  const textColorClass = white_text ? 'text-white-text' : 'text-tertiary';

  return (
    <div className="flex flex-col items-center gap-6 border-t-4 border-primary pt-8 sm:flex-row">
      {/* Date */}
      <div className="flex w-full flex-shrink-0 flex-col items-center justify-center sm:w-40">
        <p className={`font-montserrat text-3xl font-medium ${textColorClass}`}>
          {event.month}
        </p>
        <p className={`font-montserrat text-6xl font-light ${textColorClass}`}>
          {event.day}
        </p>
      </div>

      {/* Image */}
      <div className="w-full flex-shrink-0 sm:w-[240px]">
        {/* 3. Use the SanityImage component */}
        <SanityImage
          image={event.image ?? {}}
          alt={`Image for ${event.title}`}
          width={480}
          height={480}
          className="h-auto w-full rounded-md"
        />
      </div>

      {/* Details */}
      <div className="flex flex-col gap-4">
        <h3 className={`font-poppins text-xl font-bold ${textColorClass}`}>{event.title}</h3>
        <p className={`font-nunito text-base ${textColorClass}`}>{event.description}</p>
        <div>
          <p className={`font-poppins font-medium ${textColorClass}`}>{event.location}</p>
          <p className={`font-poppins text-sm font-medium ${textColorClass}`}>{event.time}</p>
        </div>
      </div>
    </div>
  );
}