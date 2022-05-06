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

interface AuthDialogProps {
  handleClose: () => void;
  open: boolean
}

const AuthDialog: React.FC<AuthDialogProps> = ({handleClose, open}) => {
  const [formType, setFormType] = useState<'main' | 'email'>('main')

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
              Вход через почту
            </div>}
          </Typography>
          {formType === 'main' && (
            <>
              <div className={styles.content}>
                <Button className='mb-10' variant='contained' fullWidth>
                  <img className='mr-10' src='/static/img/vk-logo.svg' alt='vk logo'/>
                  ВКонтакте
                </Button>
                <Button className='mb-10' variant='contained' fullWidth>
                  <img className='mr-10' src='/static/img/google-logo.svg' alt='vk logo'/>
                  Google
                </Button>
                <Button onClick={() => setFormType('email')} className='mb-10' variant='contained' fullWidth>
                  <MailIcon className='mr-10'/>
                  Email
                </Button>
                <Button className='mb-10' variant='contained' fullWidth>
                  <GitHubIcon className='mr-10'/>
                  Github
                </Button>
              </div>

              <div className={styles.miniBar}>
                <Button variant='contained'>
                  <FacebookIcon/>
                </Button>
                <Button variant='contained'>
                  <TwitterIcon/>
                </Button>
                <Button variant='contained'>
                  <AppleIcon/>
                </Button>
              </div>
            </>
          )}

          {formType === 'email' && (<>
            <form>
              <TextField
                className="mb-20"
                size="small"
                label="Почта"
                variant="outlined"
                fullWidth
                required
              />
              <TextField
                className="mb-20"
                size="small"
                label="Пароль"
                type='password'
                variant="outlined"
                fullWidth
                required
              />
              <Button color="primary" variant="contained">
                Войти
              </Button>
            </form>
          </>)}

        </DialogContentText>
      </DialogContent>

    </Dialog>
  );
};

export default AuthDialog