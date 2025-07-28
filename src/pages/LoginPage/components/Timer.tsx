import { Text } from "@chernyshovaalexandra/mtsui";
import type { FC } from "react";
import { applyNbsp } from "../../../utils";

export const OtpTimer: FC<{ seconds: number }> = ({ seconds }) => {
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <Text
      as="p"
      id="code-timer"
      aria-live="polite"
      variant="P3-Regular-Comp"
      style={{ textAlign: "center", whiteSpace: "pre-wrap" }}
    >
      {applyNbsp(
        `Мы отправили код.\nЗапросить повторно можно через ${mm}:${ss} минут.`
      )}
    </Text>
  );
};
