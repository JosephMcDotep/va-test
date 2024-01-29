import React from "react";

import classes from "./Tag.module.css";

type TagProps = {
  label: string;
  onClick: () => void;
};

const Tag: React.FC<TagProps> = ({ label, onClick }) => {
  return (
    <div className={classes.tagContainer} onClick={onClick}>
      <div>{label}</div>
    </div>
  );
};

export default Tag;
