import { useNavigate } from "react-router-dom";
import { ActivitiesGrid, ActivitiesWrapper } from "./styles";
import { ActivityCard } from "./ActivityCard";
import { Section } from "../../shared";
import { applyNbsp } from "../../utils";

export const ActivitiesSection = () => {
  const navigate = useNavigate();

  const activities = [
    {
      title: "Финтех",
      description: applyNbsp(
        `Исследуй цифровые сервисы МТС. Они делают работу с деньгами удобной, быстрой и безопасной для пользователей.`
      ),
      route: "/activities/fintech",
      bg: "/images/main/1.webp",
    },
    {
      title: "MTC Медиа",
      description: applyNbsp(
        `Изучи сервисы KION, МТС Музыка и Строки. Получи знания о современных технологиях для успешной карьеры в медиаиндустрии.`
      ),
      route: "/activities/media",
      bg: "/images/main/2.webp",
    },
    {
      title: "Рекламные технологии AdTech",
      description: applyNbsp(
        `Разберись, как МТС использует передовые технологии в рекламе. Бренды находят своих клиентов среди миллионов.`
      ),
      route: "/activities/adtech",
      bg: "/images/main/3.webp",
    },
    {
      title: "IT-направление MTS Web Services",
      description: applyNbsp(
        `Погрузись в мир IT-продуктов МТС — от облаков и кибербезопасности до сервисов, которые используют искусственный интеллект.`
      ),
      route: "/activities/web",
      bg: "/images/main/4.webp",
    },
    {
      title: "Кикшеринг МТС Юрент",
      description: applyNbsp(
        `Стартуй с Юрент: как МТС создаёт транспорт будущего с помощью мобильных сервисов аренды самокатов и велосипедов.`
      ),
      route: "/activities/urent",
      bg: "/images/main/5.webp",
    },
    {
      title: "Телеком",
      description: applyNbsp(
        `Открой зону доступа без границ — как МТС соединяет миллионы людей по всей стране и за её пределами.`
      ),
      route: "/activities/telecom",
      bg: "/images/main/6.webp",
    },
  ];

  return (
    <ActivitiesWrapper>
      <Section
        id="activities"
        title="Участвуй в активностях"
        subtitle={applyNbsp(
          `Познакомься с цифровыми направлениями МТС — от финтеха и медиа до рекламы и городского транспорта — и проверь свои знания в тестах.`
        )}
        headingLevel={2}
      >
        <ActivitiesGrid>
          {activities.map((item) => (
            <ActivityCard
              bg={item.bg}
              key={item.title}
              title={item.title}
              description={item.description}
              onClick={() => navigate(item.route)}
            />
          ))}
        </ActivitiesGrid>
      </Section>
    </ActivitiesWrapper>
  );
};
