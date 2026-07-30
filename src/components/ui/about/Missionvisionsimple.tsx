import { missionVisionData } from "../../../data/mission";


const MissionVisionSimple: React.FC = () => {
  return (
    <section className="bg-[#f4f4f4] px-6 py-16 md:px-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
        {missionVisionData.map((item) => (
          <div key={item.title}>
            <h3 className="mb-4 text-3xl font-bold text-[#16241b] md:text-4xl">
              {item.title}
            </h3>

            <p className="text-lg leading-relaxed text-gray-600">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MissionVisionSimple;