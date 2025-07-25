import {
  Navigation,
  //   IconEye,
} from "@chernyshovaalexandra/mtsui";

const navLinks = [
  { title: "Правила участия", url: "/rules" },
  { title: "Задать вопрос", url: "/faq" },
  { title: "Рейтинг участников", url: "/#" },
  // { title: "Промт-галерея", url: "/gallery" },
];

export const Header = () => {
  // const [menuOpen, setMenuOpen] = useState(false);

  return <Navigation links={navLinks} withLogin />;
};
