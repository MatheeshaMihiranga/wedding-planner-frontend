import React from "react";
import { Img } from "react-image";
import VisibilitySensor from "react-visibility-sensor";

import "./imageView.scss";

export const ImageView = React.memo(function Images({
  src,
  avatar = false,
  imgOne,
  imgTwo,
  customImageView,
  addRandomId = false,
  ...props
}: any) {
  const randomValue = Math.random();

  return avatar ? (
    <VisibilitySensor>
      <Img
        key={`${imgOne}?id=${randomValue}`}
        src={[imgOne, imgTwo]}
        className={`imageViewAvatar ${customImageView}`}
        loading="lazy"
      />
    </VisibilitySensor>
  ) : (
    <img
      src={src}
      key={src}
      className={`${customImageView}`}
      alt="images"
      {...props}
    />
  );
});
