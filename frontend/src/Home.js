import React, { useState } from "react";

const Home = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(true);
  const [signup, setSignup] = useState(false);
  const [incorrectCred, setInCorrectcred] = useState("");
  const [isSignedUp, setIsSignedUp] = useState("");
  const [ipValues, setIpvalues] = useState(false);

  const handleLogin = async () => {
    if (username != null && password != null && username && password) {
      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (res && res.status == 411) {
        setInCorrectcred("inc");
      } else {
        setInCorrectcred("crc");
        setUserName("");
        setPassword("");
      }
    }
  };
  const handleSignup = async () => {
    if (username != null && password != null && username && password) {
      const res = await fetch("http://localhost:3001/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (res.status && res.status == 412) {
        setIpvalues(true);
      } else if (res.status && res.status == 200) {
        setIsSignedUp("yes");
        setUserName("");
        setPassword("");
      } else {
        setUserName("");
        setIsSignedUp("no");
      }
      console.log("res", res);
    }
  };
  return (
    <div className="h-[760px] w-full flex justify-center items-center border border-black ">
      <div className="h-[40%] w-[30%] border border-black rounded-lg p-3">
        {login && (
          <div>
            <h1 className="text-center font-bold text-xl mb-2">Login Page</h1>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                UserName:
                <input
                  type="text"
                  placeholder="enter your username"
                  className="h-8 w-[90%] border border-black p-2 "
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                Password:
                <input
                  type="password"
                  placeholder="enter your password"
                  className="h-8 w-[90%] border border-black p-2 "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                className="border border-black p-2 w-28 rounded-lg"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
            <button
              className="font-bold text-center ml-14 mt-3"
              onClick={() => {
                setLogin(false);
                setSignup(true);
              }}
            >
              Dont have account Signup
            </button>
            {incorrectCred === "inc" && (
              <div className="text-center text-red-400">
                incorrect credentials please check and try again
              </div>
            )}
            {incorrectCred === "crc" && (
              <div className="text-center text-green-400">Login succesfull</div>
            )}
          </div>
        )}

        {signup && (
          <div>
            <h1 className="text-center font-bold text-xl mb-2">Signup Page</h1>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                UserName:
                <input
                  type="text"
                  placeholder="enter your username"
                  className="h-8 w-[90%] border border-black p-2"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                Password:
                <input
                  type="password"
                  placeholder="enter your password"
                  className="h-8 w-[90%] border border-black p-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                className="border border-black p-2 w-28 rounded-lg"
                onClick={handleSignup}
              >
                Signup
              </button>
            </div>
            <button
              className="font-bold text-center ml-24 mt-3"
              onClick={() => {
                setLogin(true);
                setSignup(false);
              }}
            >
              Already have account ! Login
            </button>
            {isSignedUp === "no" && (
              <div className="text-center text-red-400">
                username already taken
              </div>
            )}
            {isSignedUp === "yes" && (
              <div className="text-center text-green-400">
                signed up succesfull
              </div>
            )}
          </div>
        )}
        {ipValues && (
          <div className="text-center text-red-400">
            please check username and password ,try again
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
