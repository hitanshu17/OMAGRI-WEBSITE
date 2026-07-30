import type { ContactItem } from "../data/contactInfo";
import GetInTouch, {
  type ContactFormData,
} from "../components/ui/contact/GetInTouch";
import HeroSection from "../components/shared/HeroSection";
import ContactInfo from "../components/ui/contact/ContactInfo";
import aboutUsHeader from "../assets/images/bread.jpg";
import contactImg from "../assets/images/contact-us.jpg";

const myItems: ContactItem[] = [
  { id: "phone", icon: "phone", content: "(+91) 987 36 46464" },
  { id: "email", icon: "email", content: "ommagrivilla@gmail.com" },
  {
    id: "address",
    icon: "address",
    content: [
      "C-100/10, New Sabzi Mandi, Azadpur",
      "New Delhi, Delhi, 110033",
    ],
  },
];

const ContactUs = () => {
  const handleSubmit = async (data: ContactFormData) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="bg-white">
      <HeroSection
        image={aboutUsHeader}
        imageAlt="Assorted fresh fruit"
        title="Contact Us"
        breadcrumbs={[
          { label: "OMM Agri Villa", href: "/" },
          { label: "Contact Us" },
        ]}
      />

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
    </div>
  );
};

export default ContactUs;
