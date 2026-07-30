import HeroSection from "../components/shared/HeroSection";

import aboutUsHeader from "../assets/images/bread.jpg";
import ManagementTeam from "../components/ui/leadership/Team";
import { myTeam } from "../data/teamMembers";

const LeadershipPage = () => {
  return (
    <div className="bg-white">
      <HeroSection
        image={aboutUsHeader}
        imageAlt="Assorted fresh fruit"
        title="Our Leadership"
        breadcrumbs={[
          { label: "OMM Agri Villa", href: "/" },
          { label: "Our Leadership" },
        ]}
      />

      <ManagementTeam
        heading="Management Team"
        intro="OMM AGRI VILLA LLP stands as a premier trusted importer and trader of premium global fruits. Rooted in a true dedication to integrity and excellence, we are able to prioritize the finest produce from international orchards to serve the diverse needs of the Indian market.Our philosophy combines the traditional value of honesty and commitment with modern, forward-looking techniques. Adopting the gap between physical growers and local distributors, one trusted relationship at a time."
        teamMembers={myTeam}
      />
    </div>
  );
};

export default LeadershipPage;
