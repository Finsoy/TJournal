import React, {useEffect, useState} from 'react'

import styles from './TransitionLayout.module.scss'

interface ITransitionLayoutProps {
  contentFullWidth?: boolean
}

const TransitionLayout: React.FC<ITransitionLayoutProps> = ({children, contentFullWidth}) => {
  console.log(contentFullWidth)
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState("fadeOut");

  useEffect(() => {
    setTransitionStage("fadeIn");
  }, []);

  useEffect(() => {
    if (children !== displayChildren) setTransitionStage("fadeOut");
  }, [children, setDisplayChildren, displayChildren]);

  return (
    <div className={`${styles.content} ${styles[transitionStage]} ${contentFullWidth ? styles.full : null}`} onTransitionEnd={() => {
      if (transitionStage === "fadeOut") {
        setDisplayChildren(children);
        setTransitionStage("fadeIn");
      }
    }}>
      {displayChildren}
    </div>
  );
};

export default TransitionLayout;