import * as yup from "yup";

export const loginFormSchema = yup.object().shape({
  email: yup.string().required("Почта обязатальна").email("Неверная почта"),
  password: yup.string().min(6, 'Пароль должен быть более 6 символов').required("Пароль обязателен"),
})

export const registerFormSchema = yup.object().shape({
  fullName: yup.string().required("Имя и фамилия обязатальны"),
}).concat(loginFormSchema)

