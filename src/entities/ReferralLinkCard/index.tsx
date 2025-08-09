import { type FC, useMemo, useState } from "react";
import styled from "styled-components";
import Card from "../../shared/ui/Card";
import { Button } from "@chernyshovaalexandra/mtsui";
import { ACCOUNTPAGE_BTN_THEME } from "../../pages/AccountPage/constants";

const Description = styled.p`
  margin: 8px 0 16px 0;
  color: var(--text-secondary);
`;

const Status = styled.div`
  margin-top: 8px;
  font-size: var(--font-size-sm);
  color: var(--text-light-secondary);
`;

const ReferralLinkCard: FC = () => {
  const [copied, setCopied] = useState(false);

  const link = useMemo(() => {
    const origin = typeof window !== "undefined" ? window.location.origin : "https://mts.ru";
    return `${origin}/ref/demo`;
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Card title="Реферальная ссылка" titleId="referral-link-title">
      <Description>Делись ссылкой с друзьями и получай за это баллы</Description>
      <Button
        {...ACCOUNTPAGE_BTN_THEME}
        onClick={handleCopy}
        aria-label="Скопировать реферальную ссылку"
      >
        СКОПИРОВАТЬ ССЫЛКУ
      </Button>
      <Status role="status" aria-live="polite" aria-atomic="true">
        {copied ? "Ссылка скопирована" : ""}
      </Status>
    </Card>
  );
};

export default ReferralLinkCard;

