'use client'
import { useUser } from "@auth0/nextjs-auth0/client";
import { usePathname } from 'next/navigation'
import NavBrand from "./nav-brand.component";
import NavButton from "./nav-button.component";

import "./styles.scss";
import { Avatar, Stack } from "@mui/material";
import AccountMenu from "./nav-avatar.component";

const Navbar = () => {
    const { user } = useUser();
    const pathname = usePathname();
    return(
        <div className="d-flex justify-content-between">
            <div>
                <NavBrand/>
            </div>
            <div className="d-flex justify-content-between">
                {
                    user ? 
                    <Stack direction="row" alignItems="center">
                        {/* <NavButton slug="/api/auth/logout">Log out</NavButton>  */}
                        <AccountMenu user={user}/>
                        
                    </Stack>
                    : 
                    <>
                        {pathname === "/for-employers" ? 
                        <NavButton slug="/api/auth/login">Sign in</NavButton> : 
                        <NavButton slug="/for-employers" >For Employers</NavButton>
                        }
                    </>
                }
            </div>
        </div>
    )
}
export default Navbar;