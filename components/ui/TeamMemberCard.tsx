import Image from 'next/image';
import { urlFor } from '@/lib/sanity';

type TeamMemberCardProps = {
  name: string;
  pronouns: string;
  position: string;
  bio: string;
  image: object; // Sanity image object
};

export default function TeamMemberCard({
  name,
  pronouns,
  position,
  bio,
  image,
}: TeamMemberCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative mb-4 h-48 w-48 overflow-hidden rounded-full border-accent-bg border-6">
        <Image
          src={urlFor(image).width(512).height(512).quality(80).url()}
          alt={`Headshot of ${name}`}
          fill
          className="object-cover"
        />
      </div>
      <h3 className="font-poppins text-lg font-bold text-white-text">{name}</h3>
      <p className="font-nunito text-sm text-white-text">({pronouns})</p>
      <p className="mt-1 font-poppins text-base font-semibold text-white-text">
        {position}
      </p>
      <p className="mt-2 font-nunito text-sm font-light text-white-text">{bio}</p>
    </div>
  );
}