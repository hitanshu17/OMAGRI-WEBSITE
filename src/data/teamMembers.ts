export interface TeamMember {
  id: string;
  role: string;
  name: string;
  bio: string[];
  image: string;
  imageAlt: string;
  imageSide: "left" | "right";
}

export interface ManagementTeamProps {
  heading?: string;
  intro?: string;
  teamMembers?: TeamMember[];
}

export const myTeam: TeamMember[] = [
  {
    id: "person-1",
    role: "Founder & Managing Partner",
    name: "Mukesh Gaba",
    bio: [
      "With decades of experience in the agri-trade sector, Mukesh leads sourcing and quality strategy across every partner farm we work with.",
    ],
    image: "/images/jane-doe.jpg",
    imageAlt: "Portrait of Jane Doe, CEO",
    imageSide: "right",
  },
  {
    id: "person-2",
    role: "Partner, Operations",
    name: "Kanav Gaba",
    bio: ["Kanav brings a modern perspective to the business, driving our expansion into new markets while staying true to our founding commitment to quality."],
    image: "/images/john-smith.jpg",
    imageAlt: "Portrait of John Smith, COO",
    imageSide: "left",
  },
  {
    id: "person-3",
    role: "Head - Purchase & Imports",
    name: "Jitesh Gaba",
    bio: ["John oversees day-to-day operations and vendor relationships."],
    image: "/images/john-smith.jpg",
    imageAlt: "Portrait of John Smith, COO",
    imageSide: "right",
  },
];
