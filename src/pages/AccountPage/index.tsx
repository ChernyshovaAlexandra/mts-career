import { type FC } from "react";
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
          interviewSimulation={pageData.interviewSimulation}
          randomCoffee={pageData.randomCoffee}
          generalSkills={pageData.generalSkills}
          activities={pageData.activities}
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
          interviewSimulation={pageData.interviewSimulation}
          randomCoffee={pageData.randomCoffee}
          generalSkills={pageData.generalSkills}
          activities={pageData.activities}
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
