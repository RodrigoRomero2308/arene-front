import { useCallback, useEffect, useMemo, useState } from "react";
import "./RotatingImageBackground.css";

function RotatingImageBackground({
  imageSrcs,
  children,
  timeout,
}: {
  imageSrcs: string[];
  children: JSX.Element;
  timeout: number;
}) {
  const reversedSrc = [...imageSrcs].reverse();
  const [images, setImages] = useState(
    reversedSrc.map((item) => ({
      src: item,
      faded: false,
    }))
  );

  const rotateImages = useCallback(() => {
    console.log(images);
    const copyOfImages = [...images];
    const imageIndexToRotate = copyOfImages
      .reverse()
      .findIndex((item) => !item.faded);
    if (imageIndexToRotate !== copyOfImages.length - 1) {
      console.log(`rotating one image, index: ${imageIndexToRotate}`);
      setImages((oldImages) => {
        const copyOfOldImages = [...oldImages];
        return copyOfOldImages
          .reverse()
          .map((item, index) => {
            if (index === imageIndexToRotate) {
              return {
                ...item,
                faded: !item.faded,
              };
            }
            return item;
          })
          .reverse();
      });
    } else {
      console.log("rotating all");
      setImages((oldImages) => {
        return oldImages.map((item) => ({
          ...item,
          faded: false,
        }));
      });
    }
  }, [images]);

  useEffect(() => {
    const interval = setInterval(() => {
      rotateImages();
    }, timeout);

    return () => {
      clearInterval(interval);
    };
  }, [timeout, images]);

  return (
    <div className="rotating-image-background">
      <div className="rotating-image-background-images">
        {images.map((item, index) => {
          return (
            <img
              key={`image-${index}`}
              className={
                item.faded ? "rotating-image-background-image-faded" : ""
              }
              src={item.src}
              alt=""
            />
          );
        })}
      </div>
      {children}
    </div>
  );
}

export default RotatingImageBackground;
