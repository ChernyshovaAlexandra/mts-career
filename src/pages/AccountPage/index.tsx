import type { FC } from "react";
import { useMemo } from "react";
import { MainLayout } from "../../layouts";
import { ACCOUNT_PAGE_DATA } from "./constants";
import { useAccountPageHandlers } from "./hooks";
import {
  AccountPageLayout,
  AccountPageTitle,
  DesktopGrid,
  MobileLayout,
} from "./components";

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

  const pageData = useMemo(() => ACCOUNT_PAGE_DATA, []);

  return (
    <MainLayout>
      <AccountPageLayout title={<AccountPageTitle />}>
        <DesktopGrid
          personalData={pageData.personalData}
          tablePosition={pageData.tablePosition}
          interviewSimulation={pageData.interviewSimulation}
          randomCoffee={pageData.randomCoffee}
          generalSkills={pageData.generalSkills}
          activities={pageData.activities}
          onViewRating={handlers.handleViewRating}
          onChangeInterviewTime={handlers.handleChangeInterviewTime}
          onChangeCoffeeTime={handlers.handleChangeCoffeeTime}
          onActivityClick={handlers.handleActivityClick}
          onTakeSurvey={handlers.handleTakeSurvey}
        />

        <MobileLayout
          personalData={pageData.personalData}
          tablePosition={pageData.tablePosition}
          interviewSimulation={pageData.interviewSimulation}
          randomCoffee={pageData.randomCoffee}
          generalSkills={pageData.generalSkills}
          activities={pageData.activities}
          onViewRating={handlers.handleViewRating}
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
