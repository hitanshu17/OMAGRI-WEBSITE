import React from "react";
import {
  defaultItems,
  iconMap,
  type ContactInfoProps,
} from "../../data/contactInfo";

const ContactInfo: React.FC<ContactInfoProps> = ({
  image = "/images/contact-us.jpg",
  imageAlt = "Scrabble tiles spelling CONTACT US on a green background",
  heading = "Contact Information",
  subheading = "We love to hear from you",
  items = defaultItems,
}) => {
  return (
    <section className="w-full bg-white py-10 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
        {/* Left: image */}
        <div className="rounded-2xl overflow-hidden h-full min-h-100">
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: contact card */}
        <div className="rounded-2xl border border-gray-100 shadow-sm p-8 md:p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            {heading}
          </h2>
          <p className="text-gray-500 mb-8">{subheading}</p>

          <div className="flex flex-col">
            {items.map((item, idx) => {
              const Icon = iconMap[item.icon];
              const isLast = idx === items.length - 1;
              const lines = Array.isArray(item.content)
                ? item.content
                : [item.content];

              return (
                <div key={item.id}>
                  <div className="flex items-center gap-5 py-6">
                    <span className="shrink-0 w-14 h-14 rounded-full bg-[#193768] flex items-center justify-center">
                      <Icon
                        className="w-6 h-6 text-white"
                        strokeWidth={2}
                      />
                    </span>
                    <div className="text-gray-800 text-lg leading-snug">
                      {lines.map((line, lineIdx) => (
                        <p key={lineIdx}>{line}</p>
                      ))}
                    </div>
                  </div>
                  {!isLast && <hr className="border-gray-100" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
