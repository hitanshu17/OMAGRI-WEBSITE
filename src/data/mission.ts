import { Book, Eye, type LucideIcon } from "lucide-react";

interface MissionVisionItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const missionVisionData: MissionVisionItem[] = [
  {
    icon: Book,
    title: "Our Mission",
    description:
      "Building strong business partnerships with its customers and growers through trust, integrity and quality of its fresh products. Working hard towards the ongoing commitment of providing the highest quality produce to its customers.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "Bringing diversified tastes to the heterogeneous Indian population by procurement of specialty products from across the globe. Making our team adept at handling client requirements of any scale while ensuring best quality standards. Adding better technology & processes for assured safety from source to destination.",
  },
];
