import React from "react";
import classes from "./Button.module.css";

type ButtonProps = {
  onClick: () => void;
  children?: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <div className={classes.mainButton} onClick={onClick}>
      {children}
    </div>
  );
};

export default Button;
