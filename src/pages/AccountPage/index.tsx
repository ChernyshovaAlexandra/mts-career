import { type FC, useMemo } from "react";
import { MainLayout } from "../../layouts";
import { useUserStore } from "../../store";
import { useAccountPageHandlers } from "./hooks";
import {
  AccountPageLayout,
  AccountPageTitle,
  DesktopGrid,
  MobileLayout,
} from "./components";
import { ACCOUNT_PAGE_DATA } from "./constants";
import { useNavigate } from "react-router-dom";
import { formatDateTime, getDirectionFromArray } from "./utils/dateUtils";

/**
 * Страница личного кабинета
 *
 * Адаптивная страница с двумя режимами отображения:
 * - Десктоп: двухколоночная сетка с фоновым изображением
 * - Мобильный: одноколоночная компоновка для iPhone 13 mini
 *
 * @returns JSX элемент страницы личного кабинета
 */
const AccountPage: FC = () => {
  const handlers = useAccountPageHandlers();
  const pageData = ACCOUNT_PAGE_DATA;
  const user = useUserStore((s) => s.user);
  const navigate = useNavigate();

  const userGames = user?.games ?? [];

  const getProgressByGameId = (gameId: string | undefined) => {
    if (!gameId) return "Ещё не пройдено";
    const g = userGames.find((it) => it.name === gameId);
    return g ? `${g.points ?? 0} баллов` : "Ещё не пройдено";
  };

  const computedGeneralSkills = useMemo(() => {
    const skillIdByName: Record<string, string | undefined> = {
      "Карточки с советами": "sovety_resume",
      "Основные правила": "sovety_sobes",
      "Собери резюме": "komiks",
    };

    return pageData.generalSkills.map((s) => {
      const id = skillIdByName[s.name];
      const progress = id ? getProgressByGameId(id) : "Ещё не пройдено";
      const completed = /\d+\sбалл/iu.test(progress);
      return { ...s, progress, completed };
    });
  }, [pageData.generalSkills, userGames]);

  const computedActivities = useMemo(() => {
    const activityIdByName: Record<string, string | undefined> = {
      "МТС Финтех": "game1",
      "МТС Медиа": "game2",
      "МТС Телеком": "game3",
      "МТС Юрент": "game4",
      "MTS Web Services": "game5",
      "MTS AdTech": "game6",
    };

    return pageData.activities.map((a) => {
      const id = activityIdByName[a.name];
      const progress = id ? getProgressByGameId(id) : "Ещё не пройдено";
      const completed = /\d+\sбалл/iu.test(progress);
      return { ...a, progress, completed };
    });
  }, [pageData.activities, userGames]);

  const interviewSimulation = user?.sobes ? {
    direction: getDirectionFromArray(user.sobes.staff.directions),
    interviewDate: formatDateTime(user.sobes.date, user.sobes.time),
    staffName: user.sobes.staff.name,
    link: user.sobes.link,
    status: user.sobes.status,
  } : {
    ...pageData.interviewSimulation,
    direction: "Нет запланированных собеседований",
    interviewDate: "Не запланировано",
  };

  const randomCoffee = user?.kofe ? {
    employeeName: user.kofe.staff.name,
    position: getDirectionFromArray(user.kofe.staff.directions),
    meetingDate: formatDateTime(user.kofe.date, user.kofe.time),
    link: user.kofe.link,
    status: user.kofe.status,
  } : {
    ...pageData.randomCoffee,
    employeeName: "Нет запланированных встреч",
    position: "Не запланировано",
    meetingDate: "Не запланировано",
  };

  return (
    <MainLayout>
      <AccountPageLayout title={<AccountPageTitle />}>
        <DesktopGrid
          personalData={{
            firstName: user?.name || "",
            lastName: "",
            personalCode: user?.personalCode || "",
            city: user?.region || "",
            status: user?.status || "",
          }}
          tablePosition={{
            position: user?.position || 0,
            points: user?.points || 0,
          }}
          interviewSimulation={interviewSimulation}
          randomCoffee={randomCoffee}
          generalSkills={computedGeneralSkills}
          activities={computedActivities}
          onViewRating={() => navigate("/tournament-table")}
          onChangeInterviewTime={handlers.handleChangeInterviewTime}
          onChangeCoffeeTime={handlers.handleChangeCoffeeTime}
          onActivityClick={handlers.handleActivityClick}
          onTakeSurvey={handlers.handleTakeSurvey}
        />

        <MobileLayout
          personalData={{
            firstName: user?.name || "",
            lastName: "",
            personalCode: user?.personalCode || "",
            city: user?.region || "",
            status: user?.status || "",
          }}
          tablePosition={{
            position: user?.position || 0,
            points: user?.points || 0,
          }}
          interviewSimulation={interviewSimulation}
          randomCoffee={randomCoffee}
          generalSkills={computedGeneralSkills}
          activities={computedActivities}
          onViewRating={() => navigate("/tournament-table")}
          onChangeInterviewTime={handlers.handleChangeInterviewTime}
          onChangeCoffeeTime={handlers.handleChangeCoffeeTime}
          onActivityClick={handlers.handleActivityClick}
          onTakeSurvey={handlers.handleTakeSurvey}
        />
      </AccountPageLayout>
    </MainLayout>
  );
};

export default AccountPage;
