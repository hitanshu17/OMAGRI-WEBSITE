import React from "react";
import box1 from "../../assets/images/box-1.jpeg";
import box2 from "../../assets/images/box-2.jpeg";

interface BoxAndTraySectionProps {
  boxImageSrc?: string;
  trayImageSrc?: string;
  boxImageAlt?: string;
  trayImageAlt?: string;
}

export const BoxAndTraySection: React.FC<BoxAndTraySectionProps> = ({
  boxImageSrc = box2,
  trayImageSrc = box1,
  boxImageAlt = "Hayat Kiwi branded export box on a marble counter",
  trayImageAlt = "Open tray of Hayat Kiwis showing precision packing",
}) => {
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Images — left on desktop, first on mobile */}
          <div className="order-1 grid grid-cols-2 gap-4 sm:gap-5 lg:col-span-7">
            <div className="relative aspect-3/4 overflow-hidden rounded-2xl bg-gray-100 ring-1 ring-black/5">
              <img
                src={boxImageSrc}
                alt={boxImageAlt}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="relative aspect-3/4 overflow-hidden rounded-2xl bg-gray-100 ring-1 ring-black/5">
              <img
                src={trayImageSrc}
                alt={trayImageAlt}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* Text — right on desktop, second on mobile */}
          <div className="order-2 lg:col-span-5">
            <span
              className="inline-block text-xs font-bold uppercase tracking-[0.18em]"
               style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}
            >
              Premium Packaging
            </span>

            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-black sm:text-4xl">
              Box &amp; Tray
            </h2>

            <p className="mt-6 text-base leading-relaxed text-gray-600 sm:text-lg">
              Hayat Kiwis are delivered in export-grade packaging designed to
              preserve freshness and ensure high impact in retail environments.
              Our branded crates and precision-packed trays are engineered for
              the global cold chain, arriving at their destination exactly as
              nature intended.
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-gray-200 pt-6 sm:max-w-sm">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Format
                </dt>
                <dd className="mt-1 text-sm font-medium text-black">
                  Branded crate &amp; tray
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Built for
                </dt>
                <dd className="mt-1 text-sm font-medium text-black">
                  Global cold chain
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoxAndTraySection;
