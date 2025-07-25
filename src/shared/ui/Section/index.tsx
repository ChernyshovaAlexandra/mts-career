import type { FC, PropsWithChildren } from "react";
import {
  Container,
  Text,
  Separator,
  Header,
} from "@chernyshovaalexandra/mtsui";
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
  margin: 120px 0;
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
  withSeparator = false,
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
            style={{ textTransform: "uppercase" }}
            as={headingTag}
            id={headingId}
            variant="H1-Wide"
          >
            {title}
          </Header>
        </HeaderWrapper>
        {subtitle && (
          <Text variant="P4-Regular-Text" style={{ marginTop: 8 }}>
            {subtitle}
          </Text>
        )}

        {withSeparator && <Separator style={{ margin: "24px 0" }} />}

        <div style={{ marginTop: 24 }}>{children}</div>
      </Container>
    </Wrapper>
  );
};
