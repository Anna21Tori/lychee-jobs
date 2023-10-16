import NavLink from "./nav-link.component"

const NavBrand = () => {
    return (
        <NavLink slug="/" className="brand-name" >
            <span style={{color: "#ba0b32"}}>Lychee Jobs</span>
        </NavLink>
    )
}
export default NavBrand;