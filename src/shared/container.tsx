import React, { FC, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  classes?: string;
}

const Container: FC<ContainerProps> = ({ children, classes }) => {
  return <div className={`mx-auto w-3/5 ${classes}`}>{children}</div>;
};

export default Container;
