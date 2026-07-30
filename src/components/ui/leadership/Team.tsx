import React from "react";
import { myTeam, type ManagementTeamProps, type TeamMember } from "../../../data/teamMembers";

const defaultHeading = "Management Team";
const defaultIntro =
  "Our remarkably effective and industrious team is dedicated to an unceasing pursuit of advancing our enterprise. Moreover, we maintain a perpetual vigilance for fresh, exceptional skills that align with our corporate principles and aspirations. This collaborative effort propels us to achieve unparalleled outcomes for our valued clientele.";

const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  const isImageRight = member.imageSide === "right";

  return (
    <div className="flex flex-col md:flex-row items-start gap-8 md:gap-16">
      {/* Image column (rendered first on mobile always; order flips on desktop) */}
      <div
        className={`w-full md:w-55 shrink-0 order-1 ${
          isImageRight ? "md:order-2" : "md:order-1"
        }`}
      >
        <img
          src={member.image}
          alt={member.imageAlt}
          className="w-full h-auto max-w-55 mx-auto md:mx-0 object-cover rounded-sm"
        />
      </div>

      {/* Text column */}
      <div
        className={`flex-1 order-2 ${
          isImageRight ? "md:order-1" : "md:order-2"
        }`}
      >
        <span className="inline-block bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full mb-3">
          {member.role}
        </span>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{member.name}</h3>
        <div className="space-y-3">
          {member.bio.map((paragraph, idx) => (
            <p key={idx} className="text-sm leading-relaxed text-gray-500">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

const ManagementTeam: React.FC<ManagementTeamProps> = ({
  heading = defaultHeading,
  intro = defaultIntro,
//   teamMembers = defaultTeamMembers,
}) => {
  return (
    <section className="w-full bg-white py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          {heading}
        </h2>
        <p className="text-sm leading-relaxed text-gray-500 max-w-2xl mb-16">
          {intro}
        </p>

        {/* Team members */}
        <div className="flex flex-col gap-20">
          {myTeam.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ManagementTeam;
