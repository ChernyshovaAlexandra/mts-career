import { type FC } from "react";

import { Button, IconCheck } from "@chernyshovaalexandra/mtsui";
import { Avatar, CardContainer, Name, Position } from "./EmployeeCard.styled";

interface Props {
  name: string;
  position: string;
  selected?: boolean;
  onClick?: () => void;
}

export const EmployeeCard: FC<Props> = ({
  name,
  position,
  selected,
  onClick,
}) => {
  return (
    <CardContainer $selected={selected}>
      <Avatar />
      <Name>{name}</Name>
      <Position>{position}</Position>
      <Button
        onClick={onClick}
        aria-pressed={selected}
        icon={selected ? <IconCheck width={18} /> : undefined}
        variant="primary"
        width="100%"
      >
        {selected ? "ВЫБРАНО" : "ВЫБРАТЬ"}
      </Button>
    </CardContainer>
  );
};
