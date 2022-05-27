import React from "react";
import { Button } from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginFormSchema } from "../../../utils/validatoins";
import FormField from "../../FormField";
import { CreateUserDto, LoginDto } from "../../../utils/api/types";
import { UserApi } from "../../../utils/api";
import { setCookie } from "nookies";

interface LoginFormProps {
  onOpenRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onOpenRegister }) => {
  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(loginFormSchema),
  });

  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const onSubmit = async (dto: LoginDto) => {
    try {
      const data = await UserApi.login(dto);
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
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField name="email" label="Почта" />
        <FormField name="password" label="Пароль" />
        <p style={{ color: "red" }}>{errorMessage}</p>
        <div className="d-flex align-center justify-between">
          <Button
            disabled={!form.formState.isValid || form.formState.isSubmitting}
            type="submit"
            color="primary"
            variant="contained"
          >
            Войти
          </Button>

          <Button onClick={onOpenRegister} color="primary" variant="text">
            Регистрация
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
