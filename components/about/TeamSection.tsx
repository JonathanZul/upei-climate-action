// components/about/TeamSection.tsx
import TeamMemberCard from '../ui/TeamMemberCard';

const teamMembers = [
  {
    name: 'Jane Doe',
    pronouns: 'she/her',
    position: 'President',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida vitae mattis scelerisque feugiat.',
  },
  {
    name: 'John Smith',
    pronouns: 'he/him',
    position: 'Vice President',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida vitae mattis scelerisque feugiat.',
  },
  {
    name: 'Alex Ray',
    pronouns: 'they/them',
    position: 'Treasurer',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida vitae mattis scelerisque feugiat.',
  },
  {
    name: 'Emily White',
    pronouns: 'she/her',
    position: 'Secretary',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida vitae mattis scelerisque feugiat.',
  },
  {
    name: 'Michael Chen',
    pronouns: 'he/him',
    position: 'Events Coordinator',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida vitae mattis scelerisque feugiat.',
  },
  {
    name: 'Sarah Brown',
    pronouns: 'she/her',
    position: 'Marketing Lead',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida vitae mattis scelerisque feugiat.',
  },
  {
    name: 'Chris Green',
    pronouns: 'he/him',
    position: 'Advocacy Officer',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida vitae mattis scelerisque feugiat.',
  },
  {
    name: 'Jordan Lee',
    pronouns: 'they/them',
    position: 'Member at Large',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida vitae mattis scelerisque feugiat.',
  },
];

export default function TeamSection() {
  return (
    <section className="bg-tertiary py-12 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <h2 className="font-montserrat text-4xl font-medium text-white-text">
          Our Team
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.name} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
}