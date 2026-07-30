import { missionVisionData } from "../../../data/mission";

const MissionVision: React.FC = () => {
  return (
    <section className="px-6 py-16 md:px-12 lg:px-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
        {missionVisionData.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="flex h-full flex-col rounded-2xl bg-white p-8 shadow-md sm:p-10"
            >
              <div className="mb-6 flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#6f9349]">
                <Icon size={36} className="text-white" strokeWidth={1.5} />
              </div>

              <h3 className="mb-4 text-2xl font-extrabold text-[#16241b]">
                {item.title}
              </h3>

              <p className="text-base leading-relaxed text-gray-600 sm:text-lg">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MissionVision;
