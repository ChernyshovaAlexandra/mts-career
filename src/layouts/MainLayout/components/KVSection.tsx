import { Container, Header as H1, Text } from "@chernyshovaalexandra/mtsui";
import { applyNbsp } from "../../../utils";
import { Flex } from "antd";
import { memo } from "react";
import { MainS } from "./style";

export const KVSection = memo(() => {
  return (
    <MainS tabIndex={-1}>
      <Container>
        <Flex>
          <div style={{ flex: "0 1 50%" }}>
            <Flex vertical gap="16px">
              <H1
                id="main-section-heading"
                variant="H1-Wide"
                aria-label="Карьера без лимитов — основной заголовок страницы"
              >
                {`Карьера\nбез лимитов`}
              </H1>

              <Text
                variant="P2-Regular-Comp"
                aria-label="Онлайн-марафон, где можно освоить полезные навыки и получить шанс на работу в МТС"
              >
                {applyNbsp(
                  `Онлайн-марафон, где ты можешь освоить полезные навыки, пройти карьерные активности и получить шанс устроиться на работу в МТС.`
                )}
              </Text>
            </Flex>
          </div>
        </Flex>
      </Container>

      {/* Скрытое описание фона для скринридеров */}
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
