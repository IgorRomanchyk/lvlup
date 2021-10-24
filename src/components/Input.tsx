import { spawn } from "child_process";
import React from "react";
import { useFormContext } from "react-hook-form";

interface IProp {
  name: string,
  placeholder: string,
}

const Input = ({name, placeholder}: IProp) => {
  const {register, formState : {errors}} = useFormContext()
  const isError = errors[name]

  // const nameError = () => {
  //   if (name === "confirm") {
  //     return <span>pasword are not matching</span>
  //   } else {
  //     return <span>You must fill in the field {name}</span>
  //   }
  // }
  
  return (
    <div className="h-16 flex flex-col">
      <input
        {...register(name)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder={placeholder}
      />
      {isError && <span className="text-red-500 text-sm">{isError.message}</span>}
    </div>
  );
};
export default Input;
