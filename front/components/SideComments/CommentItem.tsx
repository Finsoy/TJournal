import React from "react";
import styles from "./SideComments.module.scss";
import Link from "next/link";

interface CommentItemProps {
  user: {
    id: number;
    fullName: string;
    avatarUrl: string;
  };
  createdAt: string;
  text: string;
  post: {
    title: string;
  };
}

const CommentItem: React.FC<CommentItemProps> = ({ user, text, post}) => {
  return (
    <div className={styles.commentItem}>
      <div className={styles.userInfo}>
        <img src={user.avatarUrl} alt={'User avatar'}/>
        <Link href={`/profile/${user.id}`}>
          <a>
            <b>{user.fullName}</b>
          </a>
        </Link>
      </div>
      <p className={styles.text}>{text}</p>
      <Link href={`/news/${user.id}`}>
      <a>
        <span className={styles.postTitle}>{post.title}</span>
      </a>
      </Link>
    </div>
  );
};

export default CommentItem;