import UserLayout from "../../layout/clientLayout";
import { useRouter } from "next/router";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import style from "./style.module.css";
import { registerUser, loginUser } from "../../config/redux/action/authAction";

function loginScreen() {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoginMethod, setIsLoginMethod] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (authState.isLoggedIn) {
      router.push("/dashboard");
    }
  }, [authState]);

  const handleRegister = () => {
    dispatch(registerUser({ userName, email, password, name }));
  };

  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
  };

  const switchToLogin = () => {
    setIsLoginMethod(true);
    setEmail("");
    setPassword("");
  };

  return (
    <UserLayout>
      <div className="flex items-center justify-center h-[90vh] bg-snow">
        <div className={style.cardContainer}>
          {/* LEFT */}
          <div className={style.cardContainer_left}>
            {/* Registration Success Message */}
            {authState.isRegistered && !isLoginMethod ? (
              <div className={style.successContainer}>
                <div className={style.successIcon}>✓</div>
                <h2 className={style.successTitle}>Registration Successful!</h2>
                <p className={style.successMessage}>
                  You are registered successfully. Now login to continue.
                </p>
                <button onClick={switchToLogin} className={style.successButton}>
                  Go to Login
                </button>
              </div>
            ) : (
              <>
                <p className="text-[2rem] font-bold">
                  {isLoginMethod ? "Login" : "Sign Up"}
                </p>

                {authState.isError && (
                  <p className="text-red-500 text-sm mt-2">
                    {authState.message?.message || authState.message}
                  </p>
                )}

                {authState.isLoading && (
                  <p className="text-blue-500 text-sm mt-2">
                    {authState.message}
                  </p>
                )}

                <div className={style.inputContainer}>
                  {/* Show username & name fields only for Sign Up */}
                  {!isLoginMethod && (
                    <div className={style.inputRow}>
                      <input
                        onChange={(e) => setUserName(e.target.value)}
                        className={style.inputFeild}
                        type="text"
                        placeholder="Username"
                        value={userName}
                      />
                      <input
                        onChange={(e) => setName(e.target.value)}
                        className={style.inputFeild}
                        type="text"
                        placeholder="Name"
                        value={name}
                      />
                    </div>
                  )}

                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    className={style.inputFeild}
                    type="email"
                    placeholder="Email"
                    value={email}
                  />
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    className={style.inputFeild}
                    type="password"
                    placeholder="Password"
                    value={password}
                  />

                  <div
                    onClick={() => {
                      if (isLoginMethod) {
                        handleLogin();
                      } else {
                        handleRegister();
                      }
                    }}
                    className={style.submitButton}
                  >
                    <p>{isLoginMethod ? "Login" : "Sign Up"}</p>
                  </div>

                  <p className={style.toggleText}>
                    {isLoginMethod
                      ? "Don't have an account? "
                      : "Already have an account? "}
                    <span
                      onClick={() => setIsLoginMethod(!isLoginMethod)}
                      className={style.toggleLink}
                    >
                      {isLoginMethod ? "Sign Up" : "Login"}
                    </span>
                  </p>
                </div>
              </>
            )}
          </div>

          {/* RIGHT */}
          <div className={style.cardContainer_right}></div>
        </div>
      </div>
    </UserLayout>
  );
}

export default loginScreen;
