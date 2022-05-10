import React from 'react'
import styles from "../AuthDialog.module.scss";
import {Button} from "@material-ui/core";
import {
  Apple as AppleIcon,
  Facebook as FacebookIcon,
  GitHub as GitHubIcon,
  Mail as MailIcon,
  Twitter as TwitterIcon
} from "@material-ui/icons";

interface MainFormProps {
  onOpenLogin: () => void;
}

const MainForm: React.FC<MainFormProps> = ({onOpenLogin}) => {
  return (
    <div>
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
          <Button onClick={onOpenLogin} className='mb-10' variant='contained' fullWidth>
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
    </div>
  );
};

export default MainForm;