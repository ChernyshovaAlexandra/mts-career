import type { FC } from "react";
import { MainLayout } from "../../layouts";
import { Section } from "../../shared";

const StreamPage: FC = () => (
  <MainLayout>
    <Section title="Трансляция мероприятия" align="center">
      <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%" }}>
        <iframe
          src="https://www.youtube.com/embed/live_stream?channel=CHANNEL_ID"
          title="Трансляция"
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: 0,
            borderRadius: 16,
          }}
        />
      </div>
    </Section>
  </MainLayout>
);

export default StreamPage;
