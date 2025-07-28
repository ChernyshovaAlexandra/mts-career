import { Carousel, IconArrowCircle, Text } from "@chernyshovaalexandra/mtsui";
import { videoSlides } from "../video-slide/slides";
import { Section } from "../../shared";
import { VideoSlide } from "../video-slide";
import { CustomArrow, CustomDot, DotWrapper } from "../video-slide/style";
import { applyNbsp } from "../../utils";

export const VideoSection = () => {
  return (
    <Section
      align="center"
      id="video"
      title="Голоса МТС: истории сотрудников"
      headingLevel={2}
      subtitle={applyNbsp(
        `Узнай, как в МТС создают равные возможности для всех:\nрассказы наших коллег с инвалидностью.`
      )}
    >
      <Carousel
        slidesToShow={1}
        slidesToScroll={1}
        infinite
        showDots
        arrowLeftStyle={{
          position: "absolute",
          top: 0,
          bottom: 0,
          height: "fit-content",
          left: 0,
          zIndex: 3,
          margin: "auto",
        }}
        arrowRightStyle={{
          position: "absolute",
          top: 0,
          bottom: 0,
          height: "fit-content",
          right: 0,
          zIndex: 3,
          margin: "auto",
        }}
        items={videoSlides.map((slide) => (
          <VideoSlide
            key={slide.title}
            src={slide.src}
            title={slide.title}
            onPlay={() => console.log("play", slide.title)}
          />
        ))}
        customPrevArrow={
          <CustomArrow position="left" aria-label="Предыдущий слайд">
            <IconArrowCircle
              outlined={false}
              direction="left"
              color="#1D2023"
            />
          </CustomArrow>
        }
        customNextArrow={
          <CustomArrow position="right" aria-label="Следующий слайд">
            <IconArrowCircle
              outlined={false}
              direction="right"
              color="#1D2023"
            />
          </CustomArrow>
        }
        customDots={(activeIndex, goTo) => (
          <DotWrapper>
            {videoSlides.map((_, idx) => (
              <CustomDot
                key={idx}
                active={idx === activeIndex}
                aria-label={`Перейти к слайду ${idx + 1}`}
                onClick={() => goTo(idx)}
              />
            ))}
          </DotWrapper>
        )}
      />
    </Section>
  );
};
