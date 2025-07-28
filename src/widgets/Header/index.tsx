import {
  Container,
  Button,
  Burger,
  Link as MtsLink,
  Logo,
  // IconStar,
  // IconAvatar,
  Separator,
  Text,
} from "@chernyshovaalexandra/mtsui";
import type { FC } from "react";
import { useRef, useState } from "react";
import { useUserStore } from "../../store";
import { useNavigate } from "react-router-dom";
import { Bar, Nav, NavItem, Spacer, Score, IconBtn, Surface } from "./style";

const navLinks = [
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
    <Container>
      <Bar>
        <Logo ariaLabel="MTS" />

        {/* десктоп-меню */}
        <Nav aria-label="Основная навигация">
          {navLinks.map(({ title, url }) => (
            <NavItem key={url}>
              <MtsLink to={url}>{title}</MtsLink>
            </NavItem>
          ))}
        </Nav>

        <Spacer />

        {/* правая часть */}
        {isAuth ? (
          <>
            <Score aria-label={`Баллы: ${userScore.toLocaleString("ru")}`}>
              {/* <IconStar aria-hidden="true" /> */}
              {userScore.toLocaleString("ru")}
            </Score>

            <IconBtn
              ref={anchorRef}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              onClick={toggleMenu}
            >
              {/* на мобиле бургер, на десктопе можно показать аватар */}
              <Burger ariaLabel={menuOpen ? "Закрыть меню" : "Открыть меню"} />
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
        <Surface
          role="menu"
          elevation={4}
          style={{
            position: "absolute",
            top: (anchorRef.current?.getBoundingClientRect().bottom ?? 60) + 8,
            right: 24,
            minWidth: 220,
            zIndex: 1000,
          }}
        >
          <div style={{ padding: 12 }}>
            <Text variant="P4-Medium-Comp">{userName}</Text>
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
                  {title}
                </MtsLink>
              </li>
            ))}
          </ul>

          <Separator />

          <Button
            width="100%"
            variant="secondary"
            style={{ margin: 12 }}
            onClick={() => {
              useUserStore.getState().logout();
              closeMenu();
            }}
          >
            Выйти
          </Button>
        </Surface>
      )}
    </Container>
  );
};
