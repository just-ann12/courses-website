import React, { FC, ReactNode } from "react";
import Container from "./container";

interface BannerProps {
  title?: string;
  description?: string;
  heightValue?: string;
  video?: ReactNode;
}

const Banner: FC<BannerProps> = ({
  title,
  description,
  heightValue = "22vh",
  video,
}) => {
  return (
    <div
      style={{ height: heightValue }}
      className="bg-courses-green w-full flex items-center flex-col text-white py-6"
    >
      <Container classes="flex flex-col gap-6">
        <h1 className="text-6xl text-center">{title}</h1>
        <p className="text-2xl text-center">{description}</p>
        {video}
      </Container>
    </div>
  );
};

export default Banner;
