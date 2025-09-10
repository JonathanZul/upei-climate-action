import TeamMemberCard from '../ui/TeamMemberCard';

interface TeamMember {
  _id: string;
  name: string;
  pronouns: string;
  position: string;
  bio: string;
  imageUrl: string;
}

// Props for the TeamSection component
type TeamSectionProps = {
  members: TeamMember[];
};

// The component now accepts 'members' as a prop
export default function TeamSection({ members }: TeamSectionProps) {
  return (
    <section className="bg-tertiary py-12 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <h2 className="font-montserrat text-4xl font-medium text-white-text">
          Our Team
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* We now map over the 'members' prop */}
          {members.map((member) => (
            <TeamMemberCard key={member._id} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
}

// export default function TeamSection() {
//   return (
//     <section className="bg-tertiary py-12 sm:py-24">
//       <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
//         <h2 className="font-montserrat text-4xl font-medium text-white-text">
//           Our Team
//         </h2>
//         <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
//           {teamMembers.map((member) => (
//             <TeamMemberCard key={member.name} {...member} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }