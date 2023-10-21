import { Avatar } from "@mui/material";
import NavLink from "./nav-link.component"

const NavBrand = () => {
    return (
        <NavLink slug="/" className="brand-name" >
            <Avatar variant="rounded">
                LY
            </Avatar>
        </NavLink>
    )
}
export default NavBrand;