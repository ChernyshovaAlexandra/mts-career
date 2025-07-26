import { type FC } from "react";
import styled from "styled-components";
import {
  Text,
  Header,
  Button,
  mts_greyscale_800,
} from "@chernyshovaalexandra/mtsui";
import { Flex } from "antd";

export const CardWrapper = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px;
  aspect-ratio: 408/480;
  border-radius: 32px;
  color: ${mts_greyscale_800};

  > * + * {
    margin-top: 16px;
  }
  h3 {
    text-transform: uppercase;
    white-space: pre-wrap;
  }

  @media (min-width: 590px) {
    aspect-ratio: 408/300;
  }

  @media (min-width: 768px) {
    aspect-ratio: 408/480;
  }
`;

interface SkillCardProps {
  title: string;
  description: string;
  img: string;
  onClick: () => void;
}

export const SkillCard: FC<SkillCardProps> = ({
  title,
  description,
  img,
  onClick,
}) => {
  return (
    <CardWrapper
      as="article"
      style={{
        background: `url(${img}), linear-gradient(180deg, #D4CFD0 53.75%, rgba(212, 207, 208, 0.00) 100%)`,
        backgroundPosition: "0% 100%, 0 0",
        backgroundSize: "100%, 100% 65%",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "hue",
      }}
    >
      <Flex vertical gap="10px">
        <Header as="h3" variant="H3-Wide">{title}</Header>
        <Text variant="P3-Regular-Comp">{description}</Text>
      </Flex>
      <Button
        width="fit-content"
        btn_type="button"
        variant="primary"
        onClick={onClick}
      >
        Перейти
      </Button>
    </CardWrapper>
  );
};
