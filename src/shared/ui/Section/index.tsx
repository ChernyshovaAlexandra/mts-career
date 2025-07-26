import type { FC, PropsWithChildren } from "react";
import {
  Container,
  Text,
  Separator,
  Header,
} from "@chernyshovaalexandra/mtsui";
import styled from "styled-components";

interface SectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  withSeparator?: boolean;
  headingLevel?: 1 | 2 | 3;
}

const Wrapper = styled.section`
  margin: 48px 0;
`;

export const Section: FC<PropsWithChildren<SectionProps>> = ({
  id,
  title,
  subtitle,
  children,
  withSeparator = false,
  headingLevel = 2,
}) => {
  const headingTag = `h${headingLevel}` as keyof React.JSX.IntrinsicElements;

  const headingId = `${id || title.replace(/\s+/g, "-").toLowerCase()}-heading`;

  return (
    <Wrapper id={id} role="region" aria-labelledby={headingId}>
      <Container>
        <Header as={headingTag} id={headingId} variant="H1-Wide">
          {title}
        </Header>
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
