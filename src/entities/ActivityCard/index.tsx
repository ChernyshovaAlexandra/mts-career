import type { FC } from "react";
import { Button, Header, Text } from "@chernyshovaalexandra/mtsui";
import styled from "styled-components";

interface ActivityCardProps {
  title: string;
  description?: string;
  imageSrc?: string;
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
  box-sizing: border-box;
`;

const Image = styled.img`
  width: 32px;
  height: 32px;
  object-fit: contain;
`;

const TextBlock = styled.div`
  display: grid;
  row-gap: 10px;
`;

export const ActivityCard: FC<ActivityCardProps> = ({
  title,
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  imageSrc = "/images/default-placeholder.svg",
  onClick,
}) => {
  return (
    <Card>
      <Image src={imageSrc} alt={title} />
      <TextBlock>
        <Header variant="H3-Wide">{title}</Header>
        <Text variant="P4-Regular-Text">{description}</Text>
      </TextBlock>
      <Button variant="primary" onClick={onClick}>
        Играть
      </Button>
    </Card>
  );
};
