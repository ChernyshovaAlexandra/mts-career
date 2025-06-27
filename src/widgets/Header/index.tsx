import {
  Navigation,
  //   IconEye,
} from "@chernyshovaalexandra/mtsui";

const navLinks = [
  { title: "Правила участия", url: "/rules" },
  { title: "FAQ", url: "/faq" },
  { title: "Промт-галерея", url: "/gallery" },
];

export const Header = () => {
  // const [menuOpen, setMenuOpen] = useState(false);

  return <Navigation links={navLinks} withLogin />;
};
