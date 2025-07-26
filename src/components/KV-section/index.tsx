import { Container, Header as H1, Text } from "@chernyshovaalexandra/mtsui";
import { applyNbsp } from "../../utils";
import { Flex } from "antd";
import { memo } from "react";
import { ContentMain, MainS, FlexStyled } from "./style";

export const KVSection = memo(() => {
  return (
    <MainS
      aria-label="Карьера без лимитов"
      id="kv-section"
      role="main"
      aria-labelledby="kv-heading"
    >
      <Container>
        <FlexStyled>
          <ContentMain>
            <Flex vertical gap="16px">
              <H1 id="kv-heading" variant="H1-Wide" tabIndex={-1}>
                Карьера{"\n"}без лимитов
              </H1>

              <Text variant="P2-Regular-Comp">
                {applyNbsp(
                  `Онлайн-марафон, где ты можешь освоить полезные навыки, пройти карьерные активности и получить шанс устроиться на работу в МТС.`
                )}
              </Text>
            </Flex>
          </ContentMain>
        </FlexStyled>
      </Container>

      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
        }}
      >
        Фоновое изображение с мягким фиолетово-розовым градиентом. Справа
        расположен 3D-брелок из цветных прозрачных кубиков с иконками и
        подвеской. Композиция создаёт ощущение лёгкости и карьерного роста.
      </span>
    </MainS>
  );
});
