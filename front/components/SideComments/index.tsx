import React from 'react';
import ArrowRightIcon from '@material-ui/icons/NavigateNextOutlined';

import styles from './SideComments.module.scss';

export const comments = [
  {
    id: 1,
    user: {
      fullName: 'Вася Пупкин',
      avatarUrl: 'https://leonardo.osnova.io/598fc957-a3f6-598c-b6f9-a033c3941d12/-/scale_crop/64x64/-/format/webp/'
    },
    text: 'Теперь, каждое рабочее утро, после кровати, я перекладываюсь туда спать ещё на часок. Ну и…',
    post: {
      title: 'Какая у вас дома ванна?',
    },
    createdAt: new Date().toString()
  },
  {
    id: 2,
    user: {
      fullName: 'Вадим Крылов',
      avatarUrl: 'https://sun1.beltelecom-by-minsk.userapi.com/s/v1/ig2/ikwjf8qDkkeuoRSS9h7IqJzt75oP-BNv1xgnDo9Xf4Fcmqyzj25UiKjdMh9Ktb5Iv1TT4RMk90PoeVqvG5d9NjtU.jpg?size=1280x1280&quality=95&type=album'
    },
    text: 'Теперь, каждое рабочее утро, после кровати, я перекладываюсь туда спать ещё на часок. Ну и…',
    post: {
      title: 'Какая у вас дома ванна?',
    },
    createdAt: new Date().toString()
  },
  {
    id: 3,
    user: {
      fullName: 'Вася Пупкин',
      avatarUrl: 'https://leonardo.osnova.io/598fc957-a3f6-598c-b6f9-a033c3941d12/-/scale_crop/64x64/-/format/webp/'
    },
    text: 'Теперь, каждое рабочее утро, после кровати, я перекладываюсь туда спать ещё на часок. Ну и…',
    post: {
      title: 'Какая у вас дома ванна?',
    },
    createdAt: new Date().toString()
  },
];

interface CommentItemProps {
  user: {
    fullName: string;
    avatarUrl: string;
  };
  createdAt: string;
  text: string;
  post: {
    title: string;
  };
}

const CommentItem: React.FC<CommentItemProps> = ({ user, text, post }) => {
  return (
    <div className={styles.commentItem}>
      <div className={styles.userInfo}>
        <img src={user.avatarUrl} />
        <a href="#">
          <b>{user.fullName}</b>
        </a>
      </div>
      <p className={styles.text}>{text}</p>
      <a href="#">
        <span className={styles.postTitle}>{post.title}</span>
      </a>
    </div>
  );
};

export const SideComments = () => {
  return (
    <div className={styles.root}>
      <h3>
        Комментарии <ArrowRightIcon />
      </h3>
      {comments.map((obj) => (
        <CommentItem key={obj.id} {...obj} />
      ))}
    </div>
  );
};
