import React, { type FC, useRef, useState, useEffect } from "react";
import {
  Container,
  Button,
  Link as MtsLink,
  Logo,
  Separator,
  Text,
  IconStar,
  IconUser,
} from "@chernyshovaalexandra/mtsui";
import { useUserStore } from "../../store";
import { useNavigate } from "react-router-dom";
import { Bar, Nav, Spacer, Score, IconBtn, Surface } from "./style";
import { Tag } from "@chernyshovaalexandra/mtsui";

const navLinks = [
  // { title: "Личный кабинет", url: "/account" },
  { title: "Правила участия", url: "/rules" },
  // { title: "Трансляция", url: "/stream" },
  { title: "Задать вопрос", url: "/faq" },
  { title: "Рейтинг участников", url: "/tournament-table" },
];

export const Header: FC = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const isAuth = useUserStore((s) => s.isAuth);
  const user = useUserStore((s) => s.user);
  const userName = user?.name ?? "";
  const userScore = user?.points ?? 0;

  const handleLogin = () => navigate("/login");
  const toggleMenu = () => setMenuOpen((v) => !v);
  const closeMenu = () => {
    setMenuOpen(false);
    anchorRef.current?.focus();
  };

  useEffect(() => {
    if (menuOpen) {
      const firstItem = listRef.current?.querySelector<HTMLElement>("a,button");
      firstItem?.focus();
    }
  }, [menuOpen]);

  const onMenuKeyDown: React.KeyboardEventHandler = (e) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      closeMenu();
    }
  };

  return (
    <header role="banner" style={{ boxShadow: `0 2px 6px rgba(0 0 0 / 6%)` }}>
      <Container>
        <Bar>
          <MtsLink url="/">
            <Logo role="img" aria-label="Логотип МТС" />
          </MtsLink>
          <Nav aria-label="Основная навигация">
            {navLinks.map(({ title, url }) => (
              <MtsLink key={url} type="menuItem" url={url}>
                {title}
              </MtsLink>
            ))}
          </Nav>
          <Spacer />
          {isAuth ? (
            <>
              <Score aria-label={`Баллы: ${userScore.toLocaleString("ru")}`}>
                <IconStar width={16} aria-hidden="true" />
                <Text variant="P4-Medium-Comp">
                  {userScore.toLocaleString("ru")}
                </Text>
              </Score>
              <IconBtn
                $status={user?.status || "new"}
                ref={anchorRef}
                aria-haspopup="menu"
                aria-controls="user-menu"
                aria-expanded={menuOpen}
                onClick={toggleMenu}
              >
                <IconUser width={44} height={44} aria-hidden="true" />
              </IconBtn>
            </>
          ) : (
            <Button width="fit-content" variant="primary" onClick={handleLogin}>
              Войти
            </Button>
          )}
        </Bar>
        {menuOpen && (
          <Surface
            id="user-menu"
            role="menu"
            aria-label="Меню пользователя"
            onKeyDown={onMenuKeyDown}
          >
            <div style={{ padding: "12px 16px" }}>
              <Text variant="P3-Medium-Comp">{userName}</Text>
              <div style={{ marginTop: 4 }}>
                <Tag
                  style={{
                    borderRadius: 6,
                    padding: "3px 5px 0px",
                    fontSize: 13,
                    fontFamily: "MTS Text",
                    fontWeight: 500,
                    textTransform: "none",
                    lineHeight: 1.3,
                  }}
                  bgColor="#39B54A"
                  variant="primary"
                  title="Новичок"
                />
              </div>
            </div>
            <Separator />
            <ul
              ref={listRef}
              aria-label="Меню пользователя"
              style={{ margin: 0, padding: 0, listStyle: "none" }}
            >
              <li style={{ padding: "8px 16px" }}>
                <MtsLink
                  type="menuItem"
                  role="menuitem"
                  url="/account"
                  onClick={closeMenu}
                >
                  <Text variant="P3-Regular-Comp">Личный кабинет</Text>
                </MtsLink>
              </li>
              <Separator />
              {navLinks.map(({ title, url }) => (
                <li key={url} style={{ padding: "8px 16px" }}>
                  <MtsLink
                    type="menuItem"
                    role="menuitem"
                    url={url}
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
              style={{ marginTop: 12, color: "#D8400C" }}
              onClick={() => {
                /* TODO: logout */
                closeMenu();
              }}
            >
              Выйти
            </Button>
          </Surface>
        )}
      </Container>
    </header>
  );
};
