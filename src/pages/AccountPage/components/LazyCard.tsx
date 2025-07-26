import type { FC } from "react";
import { Suspense } from "react";
import styled from "styled-components";

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: var(--text-controls-tertiary-active);
  border-radius: 12px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.04);

  &::after {
    content: "";
    width: 20px;
    height: 20px;
    border: 2px solid var(--text-controls-tertiary-active);
    border-top: 2px solid var(--text-light-accent);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

interface LazyCardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const LazyCard: FC<LazyCardProps> = ({
  children,
  fallback = <LoadingSpinner />,
}) => {
  return <Suspense fallback={fallback}>{children}</Suspense>;
};
