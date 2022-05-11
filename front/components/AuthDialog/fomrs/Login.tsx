import React from 'react'
import {Button} from "@material-ui/core";
import {useForm, FormProvider} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import {loginFormSchema} from "../../../utils/validatoins";
import FormField from "../../FormField";

interface LoginFormProps {
  onOpenRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({onOpenRegister}) => {
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(loginFormSchema)
  })

  const onSubmit = (data) => console.log(data)

  console.log(form.formState.errors)

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField name='email' label='Почта'/>
        <FormField name='password' label='Пароль'/>
        <div className='d-flex align-center justify-between'>
          <Button disabled={!form.formState.isValid} type="submit" color="primary" variant="contained">
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

export default LoginForm