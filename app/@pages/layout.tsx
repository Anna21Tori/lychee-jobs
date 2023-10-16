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
        <div className="container">
            <div className="row">
              <div className="col-12 py-3">
                <Navbar />
              </div>
            </div>
            <div className="row">
                <div className="col-12">
                {user ? employer : anyone}
                </div>
              </div>
          </div>
        }
        
    </>
  )
}