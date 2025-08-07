import type { FC } from "react";
import styled from "styled-components";
import { Header, Text } from "@chernyshovaalexandra/mtsui";

interface ClosedPlaceholderProps {
  title: string;
  reason: string;
  margin?: string;
}

const Wrapper = styled.section<{ $margin?: string }>`
  background: #f2f3f7;
  border-radius: 24px;
  padding: 24px;
  width: 100%;
  box-sizing: border-box;
  margin: ${({ $margin }) => $margin ?? "40px 0"};

  @media (max-width: 768px) {
    border-radius: 16px;
    padding: 20px;
  }
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LockIcon = styled.svg`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
`;

const ReasonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 120px;
`;

export const ClosedPlaceholder: FC<ClosedPlaceholderProps> = ({ title, reason, margin }) => {
  const headingId = `${title.replace(/\s+/g, "-").toLowerCase()}-closed-placeholder-heading`;
  const descriptionId = `${headingId}-description`;

  return (
    <Wrapper role="region" aria-labelledby={headingId} aria-describedby={descriptionId} $margin={margin}>
      <TitleRow>
        <LockIcon viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path fill="#1D2023" d="M12 2a5 5 0 0 1 5 5v3h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h1V7a5 5 0 0 1 5-5zm3 8V7a3 3 0 0 0-6 0v3h6z"/>
        </LockIcon>
        <Header as="h3" id={headingId} variant="H3-Wide">
          {title}
        </Header>
      </TitleRow>

      <ReasonContainer>
        <Text id={descriptionId} variant="P4-Regular-Text">
          {reason}
        </Text>
      </ReasonContainer>
    </Wrapper>
  );
};

export default ClosedPlaceholder;

