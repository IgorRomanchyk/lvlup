import React, { useState, useEffect } from "react";
import useAuth from "../../auth/useAuth";

import "./Auth.scss";

import history from "../../history/history";

export const BASE_URL = "https://upschool-old.herokuapp.com";
export const token = JSON.parse(localStorage.getItem("token") || "{}");

const Auth = () => {
  const auth = useAuth();

  const [spinner, setSpinner] = useState<null | boolean>(null);
  const [wrongdata, setWrongdata] = useState<null | boolean>(null);

  const [inputValue, setVaule] = useState({
    login: "",
    password: "",
  });

  async function checkStatus(res: any) {
    if (!res.ok) {
      await res.json();
      return;
    }
    return res;
  }

  function parseJSON(res: any) {
    return res.json();
  }

  useEffect(() => {
    return () => {
      setSpinner(null);
    };
  }, []);

  const authUser = async () => {
    await setSpinner(true);
    await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputValue),
    })
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => localStorage.setItem("token", JSON.stringify(data)))
      .then(() => {
        auth.signIn();
        window.location.href = "./maps";
      })
      .catch(() => {
        setSpinner(null);
        setWrongdata(true)
        setTimeout(() => setWrongdata(false), 1000)
      });

    setVaule({
      login: "",
      password: "",
    });
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setVaule({
      ...inputValue,
      [name]: value,
    });
  };

  return (
    <div>
      <form className="bg-white rounded px-8 pt-6 pb-8 w-96 m-auto">
        <div className="mb-4">
          {wrongdata && <label className="text-red-600">Вы ввели неверные данные</label>}

          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            onChange={onInputChange}
            value={inputValue.login}
            name="login"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            onChange={onInputChange}
            value={inputValue.password}
            name="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
          />
        </div>
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
          type="button"
          disabled={spinner === true}
          onClick={authUser}
        >
          {spinner && (
            <div className="loader ease-linear rounded-full border-2 border-t-2 border-gray-200 h-4 w-4 mr-2"></div>
          )}
          {spinner ? "Proccesing" : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default Auth;
