import Image from "next/image";

import TeamMemberBio from "@/components/about/TeamMemberBio";
import { urlFor } from "@/lib/sanity";

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
  // Built once here and shared with the dialog, so the two never request different sizes
  // of the same headshot.
  const imageUrl = urlFor(image).width(512).height(512).quality(80).url();

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative mb-4 h-48 w-48 overflow-hidden rounded-full border-accent-bg border-6">
        <Image
          src={imageUrl}
          alt={`Headshot of ${name}`}
          fill
          sizes="192px"
          className="object-cover"
        />
      </div>
      <h3 className="font-poppins text-lg font-bold text-white-text">{name}</h3>
      <p className="font-sans text-sm text-white-text">({pronouns})</p>
      <p className="mt-1 font-poppins text-base font-semibold text-white-text">
        {position}
      </p>
      <TeamMemberBio
        name={name}
        pronouns={pronouns}
        position={position}
        bio={bio}
        imageUrl={imageUrl}
      />
    </div>
  );
}
