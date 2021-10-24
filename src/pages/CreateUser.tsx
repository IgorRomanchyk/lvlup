import React, { useEffect } from "react";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Input from "components/Input";
import IWorker from "types/User";
import { BASE_URL } from "./Auth/Auth";
import { token } from "./Auth/Auth";
import { fetchData } from "store/Slice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";


const schema = yup.object().shape({
  login: yup.string().required("You must fill in the field login"),
  password: yup.string().required("You must fill in the field password"),
  confirm: yup
    .string()
    .oneOf([yup.ref("password"), null])
    .required("password are not matching"),
  name: yup.string(),
  surename: yup.string(),
  email: yup.string().email(),
  avatarUrl: yup.string(),
  maps: yup.array().min(1).required(),
  roles: yup.array().min(1).required(),
});

const CreateUser = () => {
  const maps = useSelector((state: RootState) => state.data.maps);
  const dispatch = useDispatch();

  if (!maps) {
    dispatch(fetchData());
  }

  const methods = useForm<IWorker>({
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;
  const isErrorMaps = errors["maps"];
  const isErrorRoles = errors["roles"];

  const onSubmit: SubmitHandler<IWorker> = async (data) => {
    if (!data.email) {
      delete data.email
    }

    console.log("Отпр: ", data);

    await fetch(`${BASE_URL}/login/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((dat) => console.log(dat));
  };

  return (
    <FormProvider {...methods}>
      <form
        className="bg-white rounded px-8 pt-6 pb-8 w-96 m-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input name="login" placeholder="Введите login" />
        <Input name="password" placeholder="Введите password" />
        <Input name="confirm" placeholder="Введите confirm password" />
        <Input name="name" placeholder="Введите name" />
        <Input name="surename" placeholder="Введите surename" />
        <Input name="email" placeholder="Введите email" />
        <Input name="avatarUrl" placeholder="Введите avatar url" />
        <div className = "my-2">
          <div className=" h-10">
            Maps
            {isErrorMaps && (
              <div className="text-red-500 text-sm h-4">
                You have to choose a map
              </div>
            )}
          </div>

          {maps &&
            maps.map((item) => (
              <div key={item.name}>
                <input
                  {...register("maps")}
                  type="checkbox"
                  value={item.name}
                />
                {item.name}
              </div>
            ))}
        </div>

        <div className = "my-2">
          <div className=" h-10">
            Roles
            {isErrorRoles && (
              <div className="text-red-500 text-sm">
                You have to choose a role
              </div>
            )}
          </div>
          <div>
            <input {...register("roles")} type="checkbox" value="ADMIN" />
            Admin
          </div>
          <div>
            <input {...register("roles")} type="checkbox" value="HEAD" />
            Head
          </div>
          <div>
            <input {...register("roles")} type="checkbox" value="TEACHER" />
            Teacher
          </div>
        </div>
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-4"
          type="submit"
        >
          Register
        </button>
      </form>
    </FormProvider>
  );
};

export default CreateUser;
