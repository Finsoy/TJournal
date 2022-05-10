import React, {useState} from 'react'
import {Button, Dialog, DialogContent, DialogContentText, Divider, TextField, Typography} from "@material-ui/core";
import {
  GitHub as GitHubIcon,
  Mail as MailIcon,
  Apple as AppleIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";

import styles from './AuthDialog.module.scss'
import MainForm from "./fomrs/MainForm";
import LoginForm from "./fomrs/Login";
import RegisterForm from "./fomrs/Register";

interface AuthDialogProps {
  handleClose: () => void;
  open: boolean
}

const AuthDialog: React.FC<AuthDialogProps> = ({handleClose, open}) => {
  const [formType, setFormType] = useState<'main' | 'login' | 'register'>('main')

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="xs"
    >

      <DialogContent className={styles.modalWrapper}>
        <DialogContentText id="alert-dialog-description">
          <Typography className={styles.title}>
            {formType === 'main' ? 'Вход в RJournal' : <div className={styles.backTitle}>
              <ArrowBackIcon onClick={() => setFormType('main')}/>
              К авторизации
            </div>}
          </Typography>
          {formType === 'main' && (
            <MainForm onOpenLogin={() => setFormType('login')}/>
          )}

          {formType === 'login' && (
            <LoginForm onOpenRegister={() => setFormType('register')}/>
          )}

          {formType === 'register' && (
            <RegisterForm onOpenRegister={() => setFormType('register')}
                          onOpenLogin={() => setFormType('login')}/>
          )}

        </DialogContentText>
      </DialogContent>

    </Dialog>
  );
};

export default AuthDialog