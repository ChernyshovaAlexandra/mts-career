import type { FC, PropsWithChildren } from "react";
import { Container, Text, Header } from "@chernyshovaalexandra/mtsui";
import styled, { css } from "styled-components";

interface SectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  withSeparator?: boolean;
  headingLevel?: 1 | 2 | 3;
  align?: "left" | "center";
}

const Wrapper = styled.section`
  padding: 60px 0;
`;

const HeaderWrapper = styled.div<{ align?: "left" | "center" }>`
  ${({ align }) =>
    align === "center" &&
    css`
      text-align: center;

      /* выравниваем и подзаголовок */
      & > * {
        margin-left: auto;
        margin-right: auto;
      }
    `}
`;

export const Section: FC<PropsWithChildren<SectionProps>> = ({
  id,
  title,
  subtitle,
  children,
  headingLevel = 2,
  align = "left",
}) => {
  const headingTag = `h${headingLevel}` as keyof React.JSX.IntrinsicElements;

  const headingId = `${id || title.replace(/\s+/g, "-").toLowerCase()}-heading`;

  return (
    <Wrapper id={id} role="region" aria-labelledby={headingId}>
      <Container>
        <HeaderWrapper align={align}>
          <Header
            style={{
              textTransform: "uppercase",
              textAlign: align,
              whiteSpace: "pre-wrap",
            }}
            as={headingTag}
            id={headingId}
            variant="H1-Wide"
          >
            {title}
          </Header>
        </HeaderWrapper>
        {subtitle && (
          <Text
            variant="P3-Regular-Comp"
            style={{
              margin: "8px auto 0px",
              textAlign: "center",
              whiteSpace: "pre-wrap",
            }}
          >
            {subtitle}
          </Text>
        )}
        <div style={{ marginTop: 24 }}>{children}</div>
      </Container>
    </Wrapper>
  );
};
