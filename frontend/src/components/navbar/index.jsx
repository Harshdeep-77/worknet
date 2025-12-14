import React from "react";
import { useRouter } from "next/router";
import style from "./navbar.module.css"

function NavBarComponent() {
  const router = useRouter();
  return(
  
    <>
     <div className="bg md:ml-[20px]" style={{marginLeft:"20px"}}>
      <nav className="mr-5 br ml-[20px] flex justify-between">
        <h1 className="cursor-pointer text-[40px] font-bold" onClick={()=>{router.push("/")}}>Worknet</h1>

        <div className="navBar flex  items-center " > 
          <div className={`${style.login} br pr-20`} onClick={()=>{router.push ("/login")}}>
            <h3 className="cursor-pointer text-[30px] ">Login</h3>
          </div>
        </div>
      </nav>
     </div>
    
    </>
  );
  
   
}

export default NavBarComponent;
