import React, {useEffect} from 'react'
import {Button, Input} from "@material-ui/core";
import dynamic from "next/dynamic";

import styles from './WriteForm.module.scss'
import MessageIcon from "@material-ui/icons/TextsmsOutlined";

const Editor = dynamic(() => import('../Editor').then(mod => mod.Editor), {ssr: false});

interface WriteFormProps {
  title?: string,
}

export const WriteForm: React.FC<WriteFormProps> = ({title}) => {
  return (
    <div>
      <Input classes={{root: styles.titleField}} placeholder="Заголовок" defaultValue={title}/>
      <div className={styles.editor}>
        <Editor/>
      </div>
      <Button variant='contained' color='primary'>
        Опубликовать
      </Button>
    </div>
  );
};