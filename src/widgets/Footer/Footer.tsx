import type { FC } from "react";
import styled from "styled-components";

const Wrapper = styled.footer`
  background-color: #f5f6f8;
  padding: 24px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.span`
  font-size: 14px;
  color: #6b6b6b;
`;

export const Footer: FC = () => {
  return (
    <Wrapper>
      <Text>© 2025 ПАО «МТС».</Text>
    </Wrapper>
  );
};
