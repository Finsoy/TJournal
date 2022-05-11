import React from 'react'
import {Button, TextField} from "@material-ui/core";
import {useForm, FormProvider} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {registerFormSchema} from "../../../utils/validatoins";
import FormField from "../../FormField";

interface RegisterFormProps {
  onOpenRegister: () => void;
  onOpenLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({onOpenRegister, onOpenLogin}) => {
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(registerFormSchema)
  })

  const onSubmit = (data) => console.log(data)

  return (
    <>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField name='fullName' label='Имя и фамилия'/>
          <FormField name='email' label='Почта'/>
          <FormField name='password' label='Пароль'/>
          <div className='d-flex align-center justify-between'>
            <Button disabled={!form.formState.isValid} onClick={onOpenRegister} type="submit" color="primary" variant="contained">
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

export default RegisterForm