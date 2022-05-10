import React from 'react'
import {Button, TextField} from "@material-ui/core";
import {useForm, FormProvider} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {loginFormSchema} from "../../../utils/schemas/loginValidation";
import FormField from "../../FormField";

interface RegisterFormProps {
  onOpenRegister: () => void;
  onOpenLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({onOpenRegister, onOpenLogin}) => {
  const form = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(loginFormSchema)
  })

  const onSubmit = (data) => console.log(data)

  console.log(form.formState.errors)

  return (
    <>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField name='fullName' label='Имя и фамилия'/>
          <FormField name='email' label='Почта'/>
          <FormField name='password' label='Пароль'/>
          <div className='d-flex align-center justify-between'>
            <Button type="submit" color="primary" variant="contained">
              Войти
            </Button>

            <Button onClick={onOpenRegister} color="primary" variant="text">
              Регистрация
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default RegisterForm