import React from "react";
import { fruitFamilyData } from "../../../data/fruitFamily";
import map from "../../../assets/images/world-map.jpg";

const FruitFamily: React.FC = () => {
  return (
    <>
      <section className="px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto max-w-full">
          {/* Heading */}
          <div className="mb-10 text-center">
            <div className="mb-3 flex items-center justify-center gap-3">
              <span className="h-0.5 w-8 bg-[#193768]" />
              <span className="font-semibold tracking-wide text-[#193768]">
                Wide range of Imported Fruits
              </span>
            </div>

            <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">
              Our Fruit Family
            </h2>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {fruitFamilyData.map((fruit) => (
              <div
                key={fruit.name}
                className="flex flex-col items-center rounded-2xl bg-white p-8 shadow-md"
              >
                <img
                  src={fruit.image}
                  alt={fruit.name}
                  className="mb-6 h-28 w-28 object-contain"
                />
                <h3 className="text-lg font-extrabold text-slate-900">
                  {fruit.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">
            Our Sources
          </h2>

          <p className="mt-8 text-base leading-relaxed text-gray-500 sm:text-lg">
            In order to become the most dependable business partner for our
            suppliers throughout the world, RB Fruitech Pvt. Ltd. aims to
            deliver an exceptional client experience.
          </p>

          <p className="mt-6 text-base leading-relaxed text-gray-500 sm:text-lg">
            By keeping the cost of imported fresh fruits affordable while
            retaining their exceptional quality, our company&apos;s mission is
            to combine a perfect balance of client happiness. In order to ensure
            environmental purity and excellent health, we encourage sustainable
            agriculture methods among our farmers and suppliers.
          </p>
        </div>
        <img 
        src={map}
        />
      </section>
    </>
  );
};

export default FruitFamily;
