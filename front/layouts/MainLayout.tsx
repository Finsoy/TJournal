import React from 'react';
import clsx from 'clsx';
import {LeftMenu} from '../components/LeftMenu';
import {SideComments} from '../components/SideComments';
import TransitionLayout from "./TransitionLayout";

interface MainLayoutProps {
  hideComments?: boolean;
  hideMenu?: boolean;
  contentFullWidth?: boolean;
  className?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
                                                        children,
                                                        contentFullWidth,
                                                        hideComments,
                                                        className,
                                                        hideMenu
                                                      }) => {
  return (
    <div className={clsx('wrapper', className)}>
      {!hideMenu && <div className="leftSide">
        <LeftMenu/>
      </div>}
      <TransitionLayout contentFullWidth>
        <div className={clsx('content', {'content--full': contentFullWidth})}>{children}</div>
      </TransitionLayout>
      {!hideComments && (
        <div className="rightSide">
          <SideComments/>
        </div>
      )}
    </div>
  );
};
