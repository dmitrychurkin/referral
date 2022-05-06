import type { BaseProps } from "@/interfaces/global";
import Navbar, { Props as NavbarProps } from "@/ui/molecules/Navbar";
import { memo } from "react";

type Props = BaseProps & NavbarProps;

const AppBar = ({ children, ...navbarProps }: Props) => (
    // TODO: probably here will be some logic related to appbar
    <Navbar {...navbarProps}>
        {children}
    </Navbar>
);

AppBar.defaultProps = {
    classes: {}
};

export default memo(AppBar);
