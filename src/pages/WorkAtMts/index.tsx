import type { FC } from "react";
import { Container } from "@chernyshovaalexandra/mtsui";
import { MainLayout } from "../../layouts";
import { VacancyGrid } from "../../widgets";
import type { VacancyRaw } from "../../widgets";
// import { RandomCoffeeSection } from "./components/RandomCoffeeSection";
import {
  PageContainer,
  HeroSection,
  ContentWrapper,
  MainTitle,
  BulletList,
  ContentSection,
  SectionTitle,
  VacancySection,
  VacancySubtitle,
} from "./WorkAtMtsPage.styles";
import { ARIA_LABELS } from "./accessibility";
import { ClosedPlaceholder } from "../../shared";

const VACANCIES: VacancyRaw[] = [
  { id: "1", category: "Работа в IT", experience: "1–3 года", location: "Москва", title: "Архитектор комплексных проектов", tag: "Гибридный", company: "ПАО МТС", link: "https://job.mts.ru/vacancy/544793617135307034" },
  { id: "2", category: "Работа в IT", experience: "3–6 лет", location: "Москва", title: "Middle Golang Developer [Bronevik]", tag: "Удалённая работа", company: "ООО МТС ТРЭВЕЛ", link: "https://job.mts.ru/vacancy/556829702187127714" },
  { id: "3", category: "Работа в IT", experience: "3–6 лет", location: "Москва", title: "Android разработчик", tag: "Удалённая работа", company: "ООО ШЕРИНГОВЫЕ ТЕХНОЛОГИИ", link: "https://job.mts.ru/vacancy/557497298154685808" },
  { id: "4", category: "Работа в IT", experience: "Без опыта", location: "Москва", title: "Стажер Data Engineer в Coffers", tag: "Гибридный", company: "АО МТС Веб Сервисы", link: "https://job.mts.ru/vacancy/557926401341131380" },
  { id: "5", category: "Технический блок", experience: "1–3 года", location: "Новосибирск", title: "Старший инженер комплексной оптимизации радиосети", tag: "В офисе", company: "ПАО МТС", link: "https://job.mts.ru/vacancy/552004065588942319" },
  { id: "6", category: "Технический блок", experience: "1–3 года", location: "Краснодар", title: "Ведущий инженер по развитию ПАК оптимизации сети", tag: "В офисе", company: "ПАО МТС", link: "https://job.mts.ru/vacancy/554553822060483628" },
  { id: "7", category: "Технический блок", experience: "3–6 лет", location: "Москва", title: "Ведущий инженер по слаботочным системам, нормировщик", tag: "Гибридный", company: "ПАО МГТС", link: "https://job.mts.ru/vacancy/537578087831831406" },
  { id: "8", category: "Технический блок", experience: "1–3 года", location: "Нижний Новгород", title: "Инженер технической поддержки массового рынка", tag: "Сменный график", company: "ПАО МТС", link: "https://job.mts.ru/vacancy/551639425151402830" },
  { id: "9", category: "Аналитика", experience: "Без опыта", location: "Псков", title: "Стажер Аналитик MTC FIX (Big Data)", tag: "В офисе", company: "ООО МТС Веб Сервисы", link: "https://job.mts.ru/vacancy/375278270398071619" },
  { id: "10", category: "Аналитика", experience: "1–3 года", location: "Москва", title: "Аналитик по расчету мотивации", tag: "Гибридный", company: "ПАО МТС", link: "https://job.mts.ru/vacancy/556848970597405575" },
  { id: "11", category: "Аналитика", experience: "3–6 лет", location: "Москва", title: "Middle System Analyst", tag: "Гибридный", company: "ООО МТС Веб Сервисы", link: "https://job.mts.ru/vacancy/549886854007097632" },
  { id: "12", category: "Аналитика", experience: "Без опыта", location: "Воронеж", title: "Старший специалист (Финансовая аналитика)", tag: "Удаленная работа", company: "АО РТК", link: "https://job.mts.ru/vacancy/544150498127643482" },
  { id: "13", category: "HR", experience: "Без опыта", location: "Ставрополь", title: "Стажер по подбору персонала", tag: "В офисе", company: "ПАО МТС", link: "https://job.mts.ru/vacancy/547684103546209115" },
  { id: "14", category: "HR", experience: "1–3 года", location: "Москва", title: "Контент-менеджер в корпоративном обучении", tag: "Гибридный", company: "ПАО МТС", link: "https://job.mts.ru/vacancy/542334489221661553" },
  { id: "15", category: "HR", experience: "3–6 лет", location: "Москва", title: "Менеджер образовательных продуктов", tag: "Гибридный", company: "ПАО МТС", link: "https://job.mts.ru/vacancy/542333840287335247" },
  { id: "16", category: "HR", experience: "1–3 года", location: "Санкт-Петербург", title: "Специалист по подбору персонала", tag: "В офисе", company: "ПАО МТС", link: "https://job.mts.ru/vacancy/557828790030435666" },
  { id: "17", category: "Продажи и развитие", experience: "1–3 года", location: "Новый Уренгой", title: "Менеджер по развитию клиентов (малый и средний бизнес)", tag: "В офисе", company: "ПАО МТС", link: "https://job.mts.ru/vacancy/516886651545325285" },
  { id: "18", category: "Продажи и развитие", experience: "1–3 года", location: "Томск", title: "Специалист по работе с корпоративными клиентами", tag: "В офисе", company: "ПАО МТС", link: "https://job.mts.ru/vacancy/525939985405182770" },
  { id: "19", category: "Продажи и развитие", experience: "1–3 года", location: "Новый Уренгой", title: "Персональный менеджер государственных заказчиков", tag: "В офисе", company: "ПАО МТС", link: "https://job.mts.ru/vacancy/536758763110007626" },
  { id: "20", category: "Продажи и развитие", experience: "1–3 года", location: "Санкт-Петербург", title: "Менеджер по развитию бизнеса в офис комплексных проектов (В2В)", tag: "В офисе", company: "ПАО МТС", link: "https://job.mts.ru/vacancy/557453537689208140" },
  { id: "21", category: "Другое", experience: "3–6 лет", location: "Москва", title: "Senior UX/UI Designer [MTC Cashback]", tag: "В офисе", company: "ООО МТС Веб Сервисы", link: "https://job.mts.ru/vacancy/544144610021081940" },
  { id: "22", category: "Другое", experience: "3–6 лет", location: "Москва", title: "B2B Product marketing manager", tag: "Гибридный", company: "АО МТС Веб Сервисы", link: "https://job.mts.ru/vacancy/506377351018316664" },
  { id: "23", category: "Другое", experience: "Без опыта", location: "Нижний Новгород", title: "Старший бухгалтер по учету операционных расходов", tag: "Гибридный", company: "ПАО МТС", link: "https://job.mts.ru/vacancy/555002444069737630" },
  { id: "24", category: "Другое", experience: "1–3 года", location: "Нижний Новгород", title: "Ведущий экономист", tag: "В офисе", company: "АО РТК", link: "https://job.mts.ru/vacancy/544150878064478466" },
];

const WorkAtMtsPage: FC = () => {
  return (
    <MainLayout>
      <HeroSection aria-labelledby="work-heading" role="banner">
        <Container>
          <ContentWrapper>
            <MainTitle id="work-heading">Работа в МТС</MainTitle>

            <BulletList role="list" aria-label={ARIA_LABELS.PAGE.STEPS_LIST}>
              <li role="listitem">
                Ознакомься с актуальными вакансиями и выбери подходящую
              </li>
              <li role="listitem">
                Присоединяйся ко встрече с сотрудником МТС, чтобы узнать больше из первых уст
              </li>
              <li role="listitem">
                Получай опыт и двигайся к новым карьерным возможностям
              </li>
            </BulletList>
          </ContentWrapper>
        </Container>
      </HeroSection>

      <PageContainer>
        <Container>
          <ContentSection aria-labelledby="vacancy-heading" role="main">
            <VacancySection>
              <SectionTitle id="vacancy-heading">
                Вакансии
              </SectionTitle>
              <VacancySubtitle>
                Используя фильтры, подбери интересующую должность и переходи на сайт МТС за деталями
              </VacancySubtitle>
              
              <VacancyGrid vacancies={VACANCIES} />
            </VacancySection>
          </ContentSection>

          {/* <RandomCoffeeSection /> */}
          <ClosedPlaceholder 
            title="Рандом-кофе с сотрудником"
            reason="Похоже, все слоты заняты. Иногда они освобождаются, попробуй позже"
            margin="24px 0"
          />
        </Container>
      </PageContainer>
    </MainLayout>
  );
};

export default WorkAtMtsPage;
