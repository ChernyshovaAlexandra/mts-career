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
}) => {
  return (
    <Wrapper id={id}>
      <Container>
        <Header variant="H1-Wide">{title}</Header>
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
