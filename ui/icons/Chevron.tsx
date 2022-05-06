import type { BaseProps } from "@/interfaces/global";

import { memo } from "react";

const Chevron = ({ className }: BaseProps) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
    >
        <path
            d="M10 16L14 12L10 8"
            stroke="#CBCBCC"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default memo(Chevron);
