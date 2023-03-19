import React, { FC } from "react";

interface CourseDescriptionItem {
  title: string;
  description: number | string | string[];
  classes?: string;
}

const CourseDescriptionItem: FC<CourseDescriptionItem> = ({
  title,
  description,
  classes,
}) => {
  return (
    <div className={classes}>
      <span className={"font-semibold"}>{title}</span>
      {description}
    </div>
  );
};

export default CourseDescriptionItem;
