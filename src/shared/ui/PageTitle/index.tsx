import type { PropsWithChildren } from "react";
import styled from "styled-components";


const Title = styled.h1`
  font-size: 56px;
  font-weight: 500;
  font-family: "MTS Wide", sans-serif;
  font-style: normal;
  text-transform: uppercase;
`;

export const PageTitle = ({ children }: PropsWithChildren) => (
<Title>{children}</Title>)
