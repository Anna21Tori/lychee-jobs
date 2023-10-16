import Link from "next/link";

export interface LinkProps {
    children: React.ReactNode,
    slug: string,
    className?: string
}
const NavLink = (props: LinkProps) => {
    const {children, slug, className} = props;
    return(
        <Link href={slug} className={className ? className : ""}>
            {children}
        </Link>
    )
}
export default NavLink;