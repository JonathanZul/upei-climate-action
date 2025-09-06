import Image from 'next/image';

type EventCardProps = {
  month: string;
  day: string;
  title: string;
  description: string;
  location: string;
  time: string;
  imageUrl: string;
};

export default function EventCard({
  month,
  day,
  title,
  description,
  location,
  time,
  imageUrl,
}: EventCardProps) {
  return (
    <div className="flex flex-col gap-6 border-t-4 border-primary pt-8 sm:flex-row">
      {/* Date */}
      <div className="flex w-full flex-col items-center justify-center sm:w-40">
        <p className="font-montserrat text-3xl font-medium text-tertiary">
          {month}
        </p>
        <p className="font-montserrat text-6xl font-light text-tertiary">
          {day}
        </p>
      </div>
      {/* Image */}
      <div className="flex-shrink-0">
        <Image
          src={imageUrl}
          alt={`Image for ${title}`}
          width={240}
          height={200}
          className="h-[200px] w-full rounded-md object-cover sm:w-[240px]"
        />
      </div>
      {/* Details */}
      <div className="flex flex-col gap-4">
        <h3 className="font-poppins text-xl font-bold text-tertiary">{title}</h3>
        <p className="font-nunito text-base text-tertiary">{description}</p>
        <div>
          <p className="font-poppins font-medium text-tertiary">{location}</p>
          <p className="font-poppins text-sm font-medium text-tertiary">{time}</p>
        </div>
      </div>
    </div>
  );
}