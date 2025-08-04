import type { FC, ReactNode } from "react";
import { Section } from "../../shared";
import { MainLayout } from "../MainLayout";
import { Text } from "@chernyshovaalexandra/mtsui";
import { GrayBlock } from "./style";
import { applyNbsp } from "../../utils/applyNbsp";

type ActivityLayoutProps = {
  title: string;
  description: string;
  bg: string;
  children?: ReactNode;
};

export const ActivityLayout: FC<ActivityLayoutProps> = ({
  title,
  description,
  children,
  bg,
}) => {
  return (
    <MainLayout bg={bg}>
      <Section title={title} align="left">
        {/* Короткое описание */}
        <GrayBlock>
          <Text variant="P1-Regular-Comp">{applyNbsp(description)}</Text>
        </GrayBlock>

        {/* Основной контент страницы */}
        {children}
      </Section>
    </MainLayout>
  );
};

export default ActivityLayout;
