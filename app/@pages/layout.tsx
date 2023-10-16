'use client'
import { useUser } from "@auth0/nextjs-auth0/client";
import Navbar from "../_components/navbar/navbar.component";

export default function RootLayout({  
  anyone, employer
}: {
  children: React.ReactNode,
  anyone: React.ReactNode,
  employer: React.ReactNode
}) {
    const { user , isLoading} = useUser();
  return (
    <>
        {isLoading ? "Loading..." : 
        <div className="container-fluid">
            <div className="row" style={{border: "1px solid rgb(220, 220, 220)"}}>
              <div className="col-12 py-3">
                <Navbar />
              </div>
            </div>
            <div className="row">
                <div className="col-12 pt-3">
                {user ? employer : anyone}
                </div>
              </div>
          </div>
        }
        
    </>
  )
}