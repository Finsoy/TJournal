import React, {useState} from 'react'
import {Button, Input} from "@material-ui/core";

import styles from './AddCommentForm.module.scss'

interface AddCommentFormProps {

}

export const AddCommentForm: React.FC<AddCommentFormProps> = () => {
  const [isActive, setIsActive] = useState(false);
  const [text, setText] = useState('');

  const onAddComment = () => {
    setText('')
    setIsActive(false)
  }

  return (
    <div className={styles.form}>
      <Input onFocus={() => setIsActive(true)} value={text} onChange={e => setText(e.target.value)} minRows={isActive ? 5 : 1}
             classes={{root: styles.fieldRoot}} placeholder="Написать комментарий..." fullWidth multiline/>
      {isActive && <Button onClick={onAddComment} className={styles.addButton} variant='contained' color='primary'>
        Опубликовать
      </Button>}
    </div>
  );
};