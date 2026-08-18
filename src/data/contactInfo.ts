import { Phone, Send, MapPin } from "lucide-react";

type ContactIconType = "phone" | "email" | "address";

export interface ContactItem {
  id: string;
  icon: ContactIconType;
  content: string | string[];
}

export interface ContactInfoProps {
  image?: string;
  imageAlt?: string;
  heading?: string;
  subheading?: string;
  items?: ContactItem[];
}

export const defaultItems: ContactItem[] = [
  {
    id: "phone",
    icon: "phone",
    content: "(+91) 987 36 46464",
  },
  {
    id: "email",
    icon: "email",
    content: "info@ommagrivilla.in",
  },
  {
    id: "address",
    icon: "address",
    content: ["C-110, New Sabzi Mandi, Azadpur", "New Delhi, Delhi, 110033"],
  },
];

export const iconMap: Record<ContactIconType, React.ElementType> = {
  phone: Phone,
  email: Send,
  address: MapPin,
};
