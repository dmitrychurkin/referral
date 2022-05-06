import type { BaseProps } from "@/interfaces/global";
import Link from "next/link";
import { memo } from "react";
import LogoIcon from "public/logo.svg";

type Props = BaseProps;

const Logo = ({ className }: Props) => (
    <Link href='/' passHref>
        <a>
          <LogoIcon />
        </a>
    </Link>
);

export default memo(Logo);
