import React, {useState} from 'react'
import {Input} from "@material-ui/core";

import styles from './AddCommentForm.module.scss'

interface AddCommentFormProps {

}

export const AddCommentForm: React.FC<AddCommentFormProps> = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div>
      <Input onFocus={() => setIsActive(true)} onBlur={() => setIsActive(false)} minRows={isActive ? 5 : 1}
             classes={{root: styles.fieldRoot}} placeholder="Написать комментарий..." fullWidth multiline/>
    </div>
  );
};