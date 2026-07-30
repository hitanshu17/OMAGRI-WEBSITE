import apples from "../assets/images/apples.png";
import grapes from "../assets/images/grapes.webp";
import kiwis from "../assets/images/kiwis.webp";
import plum from "../assets/images/plum.webp";
import oranges from "../assets/images/oranges.webp";

interface FruitItem {
  name: string;
  image: string;
}

export const fruitFamilyData: FruitItem[] = [
  {
    name: "Apples",
    image: apples,
  },
  {
    name: "Oranges",
    image: oranges,
  },
  {
    name: "Kiwis",
    image: kiwis,
  },
  {
    name: "Grapes",
    image: grapes,
  },
  {
    name: "Plum",
    image: plum,
  },
];
