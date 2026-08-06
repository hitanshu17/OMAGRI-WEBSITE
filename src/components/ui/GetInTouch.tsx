import React, { useState } from "react";

export interface ContactFormData {
  name: string;
  email: string;
  contactNumber: string;
  message: string;
}

export interface GetInTouchProps {
  heading?: string;
  subheading?: string;
  mapEmbedUrl?: string;
  mapTitle?: string;
  submitLabel?: string;
  onSubmit?: (data: ContactFormData) => void | Promise<void>;
}

const defaultMapEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.153!2d77.1547!3d28.7196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDQzJzEwLjYiTiA3N8KwMDknMTYuOSJF!5e0!3m2!1sen!2sin!4v1700000000000";

const GetInTouch: React.FC<GetInTouchProps> = ({
  heading = "Get In Touch",
  subheading = "Please fill the form, and we will get back to you soon!",
  mapEmbedUrl = defaultMapEmbedUrl,
  mapTitle = "Our location on Google Maps",
  submitLabel = "Send Message",
  onSubmit,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    contactNumber: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!onSubmit) return;
    try {
      setIsSubmitting(true);
      await onSubmit(formData);
      setFormData({ name: "", email: "", contactNumber: "", message: "" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full bg-white py-10 px-6 md:px-12 lg:px-38">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-stretch">
        {/* Left: form */}
        <div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-3">
            {heading}
          </h2>
          <p className="text-gray-500 mb-8">{subheading}</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="border border-gray-200 rounded-xl px-5 py-3 focus-within:border-[#193768] transition-colors">
              <label htmlFor="name" className="sr-only">
                Your Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full outline-none text-gray-700 placeholder-gray-400 py-1"
              />
            </div>

            <div className="border border-gray-200 rounded-xl px-5 py-3 focus-within:border-[#193768] transition-colors">
              <label htmlFor="email" className="sr-only">
                Your Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full outline-none text-gray-700 placeholder-gray-400 py-1"
              />
            </div>

            <div className="border border-gray-200 rounded-xl px-5 py-3 focus-within:border-[#193768] transition-colors">
              <label htmlFor="contactNumber" className="sr-only">
                Contact Number
              </label>
              <input
                id="contactNumber"
                name="contactNumber"
                type="tel"
                placeholder="Contact Number"
                value={formData.contactNumber}
                onChange={handleChange}
                required
                className="w-full outline-none text-gray-700 placeholder-gray-400 py-1"
              />
            </div>

            <div className="border border-gray-200 rounded-xl px-5 py-3 focus-within:border-[#193768] transition-colors">
              <label htmlFor="message" className="sr-only">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full outline-none text-gray-700 placeholder-gray-400 py-1 resize-y"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="self-start bg-[#193768] disabled:opacity-60 text-white font-semibold px-8 py-3 rounded-full transition-colors cursor-pointer"
            >
              {isSubmitting ? "Sending..." : submitLabel}
            </button>
          </form>
        </div>

        {/* Right: Google Map embed */}
        <div className="w-full h-100 lg:h-full min-h-100 rounded-xl overflow-hidden">
          <iframe
            src={mapEmbedUrl}
            title={mapTitle}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
