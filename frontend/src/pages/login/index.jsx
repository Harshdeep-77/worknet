import UserLayout from "../../layout/clientLayout";
import { useRouter } from "next/router";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import style from "./style.module.css";
import { registerUser } from "../../config/redux/action/authAction";

function loginScreen() {
  const authState = useSelector((state) => state.auth);
  const dispath = useDispatch();
  const router = useRouter();
  const [isLoginMethod, setIsLoginMethod] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (authState.authenticated) {
      router.push("/dashboard");
    }
  }, [authState]);

  const handleRegister = () => {
    dispath(registerUser({ userName, email, password, name }));
  };

  return (
    <UserLayout>
      <div className="flex items-center justify-center h-[90vh] bg-snow">
        <div className={style.cardContainer}>
          {/* LEFT */}
          <div className={style.cardContainer_left}>
            <p className="text-[2rem] font-bold">
              {isLoginMethod ? "Login" : "Sign Up"}
            </p>
            {authState.isError && (
              <p className="text-red-500 text-sm mt-2">
                {authState.message?.message || authState.message}
              </p>
            )}

            <div className={style.inputContainer}>
              <div className={style.inputRow}>
                <input
                  onChange={(e) => setUserName(e.target.value)}
                  className={style.inputFeild}
                  type="text"
                  placeholder="Username"
                />
                <input
                  onChange={(e) => setName(e.target.value)}
                  className={style.inputFeild}
                  type="text"
                  placeholder="Name "
                />
              </div>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className={style.inputFeild}
                type="email"
                placeholder="Email"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                className={style.inputFeild}
                type="password"
                placeholder="Password"
              />

              <div
                onClick={() => {
                  if (isLoginMethod) {
                  } else {
                    handleRegister();
                  }
                }}
                className="p-[40px] border-[1px] border-silver rounded-[5px]   cursor-pointer bg-gray-200"
              >
                <p> {isLoginMethod ? "Login" : "Sign Up"}</p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className={style.cardContainer_right}></div>
        </div>
      </div>
    </UserLayout>
  );
}

export default loginScreen;
