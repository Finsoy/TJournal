import React from "react";
import { Button, TextField } from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { setCookie } from "nookies";

import { registerFormSchema } from "../../../utils/validatoins";
import FormField from "../../FormField";
import { CreateUserDto } from "../../../utils/api/types";
import { UserApi } from "../../../utils/api";

interface RegisterFormProps {
  onOpenRegister: () => void;
  onOpenLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onOpenRegister,
  onOpenLogin,
}) => {
  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(registerFormSchema),
  });

  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const onSubmit = async (dto: CreateUserDto) => {
    try {
      const data = await UserApi.register(dto);
      console.log(data);
      setCookie(null, "authToken", data.access_token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      setErrorMessage(null);
    } catch (error) {
      console.warn(error.response.data.message);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField name="fullName" label="Имя и фамилия" />
          <FormField name="email" label="Почта" />
          <FormField name="password" label="Пароль" />
          <p style={{ color: "red" }}>{errorMessage}</p>
          <div className="d-flex align-center justify-between">
            <Button
              disabled={!form.formState.isValid || form.formState.isSubmitting}
              onClick={onOpenRegister}
              type="submit"
              color="primary"
              variant="contained"
            >
              Зарегестрироваться
            </Button>

            <Button onClick={onOpenLogin} color="primary" variant="text">
              Войти
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default RegisterForm;
