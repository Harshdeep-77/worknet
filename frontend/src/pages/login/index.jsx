import UserLayout from "../../layout/clientLayout";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { useEffect,useState } from "react";
import style from "./style.module.css"



function loginScreen() {

  const authState=useSelector((state)=>state.auth)
  const router=useRouter();
  const [isLoginMethod , setIsLoginMethod] = useState(false);


  useEffect(()=>{
    if(authState.authenticated){
      router.push("/dashboard")
    }
  },[authState])


  return (
<UserLayout>
  <div className="flex items-center justify-center h-[90vh] bg-snow">

    <div className={style.cardContainer}>

    
    {/* LEFT */}
    <div className={style.cardContainer_left}>
      <p className="text-[2rem] font-bold">{isLoginMethod ? "Login" : "Sign Up"}</p>


      <div className="flex flex-col justify-center items-center gap-10 max-w-[400px]  mx-auto " >
        <div className={style.inputRow}>
          <input className={style.inputFeild} type="password" placeholder="Password" />
          <input className={style.inputFeild} type="text" placeholder="Name " />


         
        </div>

      </div>
      
      
    </div>  
    
    {/* RIGHT */}
    <div className= {style.cardContainer_right}>
      
    </div>
    </div>
  </div>
  
  </UserLayout>
  )
}

export default loginScreen;
