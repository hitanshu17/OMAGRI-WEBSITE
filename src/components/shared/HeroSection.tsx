import React from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface HeroSectionProps {
  image: string;
  imageAlt: string;
  title: React.ReactNode;
  breadcrumbs: BreadcrumbItem[];
  heightClassName?: string;
}

const HeroSection = ({
  image,
  imageAlt,
  title,
  breadcrumbs,
  heightClassName = "h-[320px] md:h-[380px]",
}: HeroSectionProps) => {
  return (
    <section className={`relative w-full overflow-hidden ${heightClassName}`}>
      <img
        src={image}
        alt={imageAlt}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/55" />

      <div className="relative flex h-full flex-col justify-center px-6 md:px-16">
        <h1 className="text-3xl font-bold text-white md:text-5xl">{title}</h1>

        <nav className="mt-3 text-sm text-white/90 md:text-base">
          {breadcrumbs.map((item, index) => (
            <span key={index}>
              {index > 0 && <span className="mx-2">&gt;</span>}
              {item.href ? (
                <a href={item.href} className="hover:text-white">
                  {item.label}
                </a>
              ) : (
                <span>{item.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </section>
  );
};

export default HeroSection;
