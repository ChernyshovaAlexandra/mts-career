import {
  Container,
  Button,
  Burger,
  Link as MtsLink,
  Logo,
  Separator,
  Text,
  IconStar,
  Link,
} from "@chernyshovaalexandra/mtsui";
import type { FC } from "react";
import { useRef, useState } from "react";
import { useUserStore } from "../../store";
import { useNavigate } from "react-router-dom";
import { Bar, Nav, Spacer, Score, IconBtn, Surface } from "./style";

const navLinks = [
  { title: "Личный кабинет", url: "/account" },
  { title: "Правила участия", url: "/rules" },
  { title: "Трансляция", url: "/stream" },
  { title: "Задать вопрос", url: "/faq" },
  { title: "Рейтинг участников", url: "/tournament-table" },
];

export const Header: FC = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const isAuth = useUserStore((s) => s.isAuth);
  const user = useUserStore((s) => s.data);
  const userName = user
    ? `${user.personalData.firstName} ${user.personalData.lastName}`
    : "";
  const userScore = user?.tablePosition.points ?? 0;

  /* handlers */
  const handleLogin = () => navigate("/login");
  const toggleMenu = () => setMenuOpen((v) => !v);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div
      style={{
        boxShadow: `0 2px 6px rgba(0 0 0 / 6%)`,
      }}
    >
      <Container>
        <Bar>
          <Link url="/">
            <Logo ariaLabel="MTS" />
          </Link>
          {/* десктоп-меню */}
          <Nav aria-label="Основная навигация">
            {navLinks.map(({ title, url }) => (
              <MtsLink underlined url={url}>
                {title}
              </MtsLink>
            ))}
          </Nav>

          <Spacer />

          {/* правая часть */}
          {!isAuth ? (
            <>
              <Score aria-label={`Баллы: ${userScore.toLocaleString("ru")}`}>
                <IconStar width={16} aria-hidden="true" />
                <Text variant="P4-Medium-Comp">
                  {userScore.toLocaleString("ru")}
                </Text>
              </Score>

              <IconBtn
                ref={anchorRef}
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                onClick={toggleMenu}
              >
                {/* на мобиле бургер, на десктопе можно показать аватар */}
                <Burger
                  ariaLabel={menuOpen ? "Закрыть меню" : "Открыть меню"}
                />
              </IconBtn>
            </>
          ) : (
            <Button width="fit-content" variant="primary" onClick={handleLogin}>
              Войти
            </Button>
          )}
        </Bar>

        {/* простейший popover; замените на готовый Popover из библиотеки, если он есть */}
        {menuOpen && (
          <Surface role="menu" elevation={4}>
            <div style={{ padding: "12px 6px" }}>
              <Text variant="P3-Medium-Comp">{userName}</Text>
            </div>
            <Separator />

            <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
              {navLinks.map(({ title, url }) => (
                <li key={url}>
                  <MtsLink
                    role="menuitem"
                    to={url}
                    style={{ display: "block", padding: "8px 12px" }}
                    onClick={closeMenu}
                  >
                    <Text variant="P3-Regular-Comp">{title}</Text>
                  </MtsLink>
                </li>
              ))}
            </ul>

            <Separator />

            <Button
              width="100%"
              variant="secondary"
              style={{ marginTop: 12, maxWidth: "100%", color: "#D8400C" }}
              onClick={() => {
                /* TODO logout */
                closeMenu();
              }}
            >
              Выйти
            </Button>
          </Surface>
        )}
      </Container>
    </div>
  );
};
