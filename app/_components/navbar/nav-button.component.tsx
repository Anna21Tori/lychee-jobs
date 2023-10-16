import { Button } from "@mui/material"
import Link from "next/link";

export interface NavButtonProps {
    children: React.ReactNode,
    slug: string,
    className?: string
}

const NavButton = (props: NavButtonProps) => {
    const {children, slug, className} = props;
    return (
        <Button size="small" style={{marginLeft: "10px"}} component={Link} variant="outlined" href={slug} className={className ? className : ""}>{children}</Button>
    )
}
export default NavButton;