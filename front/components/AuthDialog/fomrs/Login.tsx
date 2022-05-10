import React from 'react'
import {Button, TextField} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {loginFormSchema} from "../../../utils/schemas/loginValidation";

interface LoginFormProps {
  onOpenRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({onOpenRegister}) => {
  const form = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(loginFormSchema)
  })

  const onSubmit = (data) => console.log(data)

  console.log(form.formState.errors)

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <TextField
          name="email"
          {...form.register('email')}
          helperText={form.formState.errors.email?.message}
          error={!!form.formState.errors.email?.message}
          className="mb-20"
          size="small"
          label="Почта"
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          name="password"
          {...form.register('password')}
          helperText={form.formState.errors.password?.message}
          error={!!form.formState.errors.password?.message}
          className="mb-20"
          size="small"
          label="Пароль"
          type='password'
          variant="outlined"
          fullWidth
          required
        />
        <div className='d-flex align-center justify-between'>
          <Button type="submit" color="primary" variant="contained">
            Войти
          </Button>

          <Button onClick={onOpenRegister} color="primary" variant="text">
            Регистрация
          </Button>
        </div>
      </form>
    </>
  );
};

export default LoginForm