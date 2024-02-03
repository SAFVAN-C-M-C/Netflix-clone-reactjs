import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { user, signIn } = UserAuth();
  const navigate = useNavigate();
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  const handleSubmit = async (e) => {
    setError("");
    e.preventDefault();
    if (!isValidEmail(email)) {
      setEmailError("Enter proper email!");
      return;
    }
    if (password.length < 8) {
      setPasswordError("Password has more than 8 charencters");
      return;
    }
    try {
      await signIn(email, password);
      navigate("/");
    } catch (error) {
      console.log(error.message);
      setError(error.message.split("(auth/")[1].split(")")[0]);
    }
  };
  if(error.length>0){
    setTimeout(() => setError(""), 6000);
  }else if(emailError.length>0){
    setTimeout(() => setEmailError(""), 3000);
  }else if(passwordError.length>0){
    setTimeout(() => setPasswordError(""), 3000);
  }
  
  return (
    <>
      <div className="w-full h-screen">
        <img
          className="hidden sm:block absolute w-full object-cover h-full"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/4da5d2b1-1b22-498d-90c0-4d86701dffcc/98a1cb1e-5a1d-4b98-a46f-995272b632dd/IN-en-20240129-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="/"
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-screen "></div>
        <div className="fixed w-full px-4 py-24 z-50">
          <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white">
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="text-3xl font-bold">Sign In</h1>
              {error ? <p className="p-2 my-2 bg-red-500">{error}</p> : null}
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col py-4"
              >
                <input
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-3 my-2 bg-gray-600 rounded"
                  placeholder="Email"
                  type="email"
                  autoComplete="email"
                />
                {emailError && (
                  <p className="text-xs text-gray-400">{emailError}</p>
                )}
                <input
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="p-3 my-2 bg-gray-600 rounded"
                  placeholder="Password"
                  type="password"
                  autoComplete="current-password"
                />
                {passwordError && (
                  <p className="text-xs text-gray-400">{passwordError}</p>
                )}
                <button className="bg-red-600 py-3 my-6 rounded font-bold">
                  Sign In
                </button>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <p className="flex">
                    <input className="mr-2" type="checkbox" />
                    Rember me
                  </p>
                  <p>Need help?</p>
                </div>
                <p className="py-8">
                  <span className="text-gray-500">New to Netfilix?</span>
                  <Link to="/signup"> Sign Up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
