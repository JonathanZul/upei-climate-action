import Image from 'next/image';

type TeamMemberCardProps = {
  name: string;
  pronouns: string;
  position: string;
  bio: string;
  imageUrl: string; // The URL for the member's image
};

export default function TeamMemberCard({
  name,
  pronouns,
  position,
  bio,
  imageUrl,
}: TeamMemberCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative mb-4 h-48 w-48 overflow-hidden rounded-full border-accent-bg border-6">
        <Image
          src={imageUrl}
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