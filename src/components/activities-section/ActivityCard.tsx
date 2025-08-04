import { type FC } from "react";
import { Text, Header, Button } from "@chernyshovaalexandra/mtsui";
import { ActivityCardWrapper, ActivityContent, ButtonWrapper } from "./styles";

interface ActivityCardProps {
  title: string;
  description: string;
  onClick: () => void;
  bg: string;
}

export const ActivityCard: FC<ActivityCardProps> = ({
  title,
  description,
  onClick,
  bg,
}) => {
  return (
    <ActivityCardWrapper $bg={bg}>
      <ActivityContent>
        <div>
          <Header as="h3" variant="H3-Wide">
            {title}
          </Header>
          <Text variant="P3-Regular-Comp" style={{ marginTop: 8 }}>
            {description}
          </Text>
        </div>
        <ButtonWrapper>
          <Button
            width="fit-content"
            btn_type="button"
            variant="tetriary"
            onClick={onClick}
          >
            Подробнее
          </Button>
        </ButtonWrapper>
      </ActivityContent>
    </ActivityCardWrapper>
  );
};
