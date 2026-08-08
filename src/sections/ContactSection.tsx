import ContactInfo from "../components/ui/ContactInfo";
import GetInTouch, { type ContactFormData } from "../components/ui/GetInTouch";
import type { ContactItem } from "../data/contactInfo";
import contactImg from "../assets/images/contactus.jpeg";

const ContactSection = () => {
  const myItems: ContactItem[] = [
    {
      id: "phone",
      icon: "phone",
      content: ["(+91) 8448332700"],
    },
    {
      id: "email",
      icon: "email",
      content: ["info@ommagrivilla.in", "ommagrivilla@gmail.com"],
    },
    {
      id: "address",
      icon: "address",
      content: ["C-110, New Sabzi Mandi, Azadpur", "New Delhi, Delhi, 110033"],
    },
  ];

  const handleSubmit = async (data: ContactFormData) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Failed to submit");
    }
  };

  return (
    <section id="contact-us">
      <div className="px-6 pt-16 md:px-12 lg:px-20">
        <h2
          className="text-4xl sm:text-5xl font-extrabold text-center text-slate-900 mb-12"
          id="contact"
        >
          Contact Us
        </h2>
      </div>

      <ContactInfo
        image={contactImg}
        imageAlt="Scrabble tiles spelling CONTACT US"
        heading="Contact Information"
        subheading="We love to hear from you"
        items={myItems}
      />

      <GetInTouch
        heading="Get In Touch"
        subheading="Please fill the form, and we will get back to you soon!"
        submitLabel="Send Message"
        onSubmit={handleSubmit}
        mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.2516668910375!2d77.172411!3d28.712023999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d015024cd4d4b%3A0x5a943fb208ad9bcc!2sOMM%20AGRI%20VILLA%20LLP!5e0!3m2!1sen!2sin!4v1785428490510!5m2!1sen!2sin"
        mapTitle="OMM Agri Villa LLP location"
      />
    </section>
  );
};

export default ContactSection;
