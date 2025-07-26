import { Header } from "@chernyshovaalexandra/mtsui";
import type { PropsWithChildren } from "react";

const TitleStyle: React.CSSProperties = {
  padding: "68px 0 40px",
  margin: "0 auto",
  textAlign: "center",
  fontSize: "56px",
  fontWeight: "500",
  fontFamily: '"MTS Wide", sans-serif',
  fontStyle: "normal",
  textTransform: "uppercase",
};

export const PageTitle = ({ children }: PropsWithChildren) => (
  <Header style={TitleStyle} variant="H1-Wide">
    {children}
  </Header>
);
