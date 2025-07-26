import type { PropsWithChildren } from "react";
import styled from "styled-components";

const Title = styled.h1`
  padding: 68px 0 40px;
  margin: 0 auto;
  text-align: center;
  font-size: 56px;
  font-weight: 500;
  font-family: "MTS Wide", sans-serif;
  font-style: normal;
  text-transform: uppercase;
`;

export const PageTitle = ({ children }: PropsWithChildren) => (
  <Title>{children}</Title>
);
