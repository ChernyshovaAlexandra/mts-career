import type { FC } from "react";
import {
  Button,
  Header,
  IconDate,
  Text,
} from "@chernyshovaalexandra/mtsui";
import styled from "styled-components";

interface SkillCardProps {
  title: string;
  description?: string;
  onClick?: () => void;
}

const Card = styled.div`
  background: #f5f6f8;
  border-radius: 16px;
  padding: 24px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  row-gap: 24px;
  width: 100%;
  max-width: 320px;
  box-sizing: border-box;
`;

const TextBlock = styled.div`
  display: grid;
  row-gap: 10px;
`

export const SkillCard: FC<SkillCardProps> = ({
  title,
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  onClick,
}) => {
  return (
    <Card>
      <IconDate />
      <TextBlock>
        <Header variant="H3-Wide">{title}</Header>
        <Text variant="P4-Regular-Text">{description}</Text>
      </TextBlock>
      <Button variant="primary" onClick={onClick} aria-label="Перейти в раздел">
        Перейти в раздел
      </Button>
    </Card>
  );
};
