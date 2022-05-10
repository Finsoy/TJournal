import React from 'react'
import {useFormContext} from "react-hook-form";
import {TextField} from "@material-ui/core";

interface FormFieldProps {
  name: string;
  label: string;
}

const FormField: React.FC<FormFieldProps> = ({name, label}) => {
  const {register, formState} = useFormContext()
  return (
    <TextField
      name={name}
      {...register(name)}
      helperText={formState.errors[name]?.message}
      error={!!formState.errors[name]?.message}
      className="mb-20"
      size="small"
      label={label}
      variant="outlined"
      fullWidth
    />
  );
};

export default FormField