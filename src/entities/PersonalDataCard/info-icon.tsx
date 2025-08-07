import type { FC } from "react";

export const InfoIcon: FC<{ size?: number }> = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <circle cx="12" cy="12" r="10" fill="#EEF0F4" stroke="#C5CAD3" />
    <path d="M12 10.5v6" stroke="#6B7280" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="12" cy="7.5" r="1.2" fill="#6B7280" />
  </svg>
);

export default InfoIcon;

