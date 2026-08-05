import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import {
  defaultItems,
  iconMap,
  type ContactInfoProps,
} from "../../data/contactInfo";

interface SocialLink {
  href: string;
  label: string;
}

interface ContactInfoPropsExtended extends ContactInfoProps {
  socialLinks?: {
    instagram?: SocialLink;
    facebook?: SocialLink;
  };
}

const ContactInfo: React.FC<ContactInfoPropsExtended> = ({
  image = "/images/contact-us.jpg",
  imageAlt = "Scrabble tiles spelling CONTACT US on a green background",
  heading = "Contact Information",
  subheading = "We love to hear from you",
  items = defaultItems,
  socialLinks = {
    instagram: { href: "#", label: "Instagram" },
    facebook: { href: "#", label: "Facebook" },
  },
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
            {items.map((item) => {
              const Icon = iconMap[item.icon];
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
                  <hr className="border-gray-100" />
                </div>
              );
            })}

            {/* Social media row — same rhythm as the items above */}
            {(socialLinks?.instagram || socialLinks?.facebook) && (
              <div className="flex items-center gap-5 py-6">
                <div className="flex -space-x-2 shrink-0">
                  {socialLinks?.instagram && (
                    <a
                      href={socialLinks.instagram.href}
                      aria-label={socialLinks.instagram.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 rounded-full flex items-center justify-center
                                 bg-linear-to-tr from-[#FEDA75] via-[#D62976] to-[#4F5BD5]
                                 ring-4 ring-white
                                 transition-transform duration-200 hover:scale-105 hover:z-10 relative"
                    >
                      <FaInstagram className="w-6 h-6 text-white" />
                    </a>
                  )}

                  {socialLinks?.facebook && (
                    <a
                      href={socialLinks.facebook.href}
                      aria-label={socialLinks.facebook.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 rounded-full flex items-center justify-center
                                 bg-[#1877F2]
                                 ring-4 ring-white
                                 transition-transform duration-200 hover:scale-105 hover:z-10 relative"
                    >
                      <FaFacebook className="w-6 h-6 text-white" />
                    </a>
                  )}
                </div>
                <div className="text-gray-800 text-lg leading-snug">
                  <p className="font-medium">Follow us</p>
                  <p className="text-gray-500 text-base">
                    @ommagrivilla on social media
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;