import { memo } from "react";
import {
  Button,
  Container,
  Header,
  mts_brand_red,
  Text,
} from "@chernyshovaalexandra/mtsui";
import { Flex } from "antd";
import {
  GrayBlock,
  GrayBlockDiv,
  HiddenHeading,
  MarathonSection,
  StyledOl,
  GrayBlockDivTranslation,
} from "./style";
import { applyNbsp } from "../../utils";

export const MarathonSteps = memo(() => {
  return (
    <MarathonSection aria-labelledby="marathon-steps-heading" role="region">
      <Container>
        <HiddenHeading id="marathon-steps-heading">
          Этапы участия и даты марафона
        </HiddenHeading>
        <StyledOl aria-label="Этапы участия в марафоне">
          {[
            { num: "01", text: "Осваивай навыки\nи пробуй себя в разных\nактивностях" },
            { num: "02", text: "Получай за это баллы,\nчтобы стать участником\nрозыгрыша призов" },
            { num: "03", text: "Выиграй приглашение\nв Москву на карьерное\nмероприятие МТС" },
          ].map((step) => (
            <GrayBlock key={step.num}>
              <Text style={{ color: mts_brand_red }} variant="P1-Regular-Comp">
                {step.num}
              </Text>
              <Header variant="H4-Wide">{applyNbsp(step.text)}</Header>
            </GrayBlock>
          ))}
        </StyledOl>

        <Flex
          wrap
          justify="space-between"
          style={{ marginTop: "20px", gap: "20px" }}
        >
          <GrayBlockDiv>
            <dl>
              <dt>11 августа — 1 сентября</dt>
              <dd>Дни проведения марафона</dd>
            </dl>
          </GrayBlockDiv>

          <GrayBlockDiv>
            <dl>
              <dt>1—8 сентября</dt>
              <dd>Объявление победителей</dd>
            </dl>
          </GrayBlockDiv>
        </Flex>
        <GrayBlockDivTranslation>
          <Flex vertical gap={"38px"} align="left">
            <Header
              variant="H3-Wide"
              as="h3"
              style={{ textTransform: "uppercase", textAlign: "left" }}
            >
              Трансляция мероприятия
            </Header>
            <Button
              style={{ textTransform: "uppercase" }}
              width="fit-content"
              variant="primary"
            >
              Смотреть
            </Button>
          </Flex>
        </GrayBlockDivTranslation>
      </Container>
    </MarathonSection>
  );
});
