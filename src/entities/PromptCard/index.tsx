import type { FC } from 'react';
import styled from 'styled-components';
import { Header, Text } from '@chernyshovaalexandra/mtsui';

interface PromptCardProps {
  title: string;
  imageSrc: string;
  description: string;
}

const Card = styled.div`
  background: #f5f6f8;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const PromptCard: FC<PromptCardProps> = ({ title, imageSrc, description }) => (
  <Card>
    <Image src={imageSrc} alt={title} />
    <Content>
      <Header variant="H3-Wide">{title}</Header>
      <Text variant="P4-Regular-Text">{description}</Text>
    </Content>
  </Card>
);

export default PromptCard;
