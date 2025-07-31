import type { FC, ReactNode } from "react";
import { memo } from "react";
import { IconDropdown } from "@chernyshovaalexandra/mtsui";
import {
  SectionContainer,
  SectionHeader,
  HeaderContent,
  HeaderDescription,
  SectionTitle,
  SectionContent
} from "./styles";

interface ExpandableSectionProps {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  noPaddingTop?: boolean;
}

export const ExpandableSection: FC<ExpandableSectionProps> = memo(({
  id,
  title,
  description,
  children,
  isExpanded,
  onToggle,
  noPaddingTop = false
}) => {
  const headingId = `${id}-heading`;
  const contentId = `${id}-content`;

  return (
    <SectionContainer>
      <SectionHeader
        $isExpanded={isExpanded}
        $hasDescription={!!description}
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={contentId}
        id={headingId}
        type="button"
      >
        <HeaderContent>
          <SectionTitle as="h3">
            {title}
          </SectionTitle>
          {description && isExpanded && (
            <HeaderDescription variant="P4-Regular-Text">
              {description}
            </HeaderDescription>
          )}
        </HeaderContent>
        <IconDropdown 
          style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", marginTop: (description && isExpanded) ? "8px" : "0" }}
          aria-hidden="true"
        />
      </SectionHeader>
      
      <SectionContent
        $isExpanded={isExpanded}
        $noPaddingTop={noPaddingTop}
        id={contentId}
        role="region"
        aria-labelledby={headingId}
        aria-hidden={!isExpanded}
      >
        {children}
      </SectionContent>
    </SectionContainer>
  );
}); 