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
      loaded: false,
    }))
  );

  const allImagesHaveLoaded = useMemo(() => {
    return images.every((image) => image.loaded);
  }, [images]);

  const rotateImages = useCallback(() => {
    const copyOfImages = [...images];
    const imageIndexToRotate = copyOfImages
      .reverse()
      .findIndex((item) => !item.faded);
    if (imageIndexToRotate !== copyOfImages.length - 1) {
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
      setImages((oldImages) => {
        return oldImages.map((item) => ({
          ...item,
          faded: false,
        }));
      });
    }
  }, [images]);

  useEffect(() => {
    let interval: number | undefined;
    if (allImagesHaveLoaded) {
      interval = window.setInterval(() => {
        rotateImages();
      }, timeout);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timeout, images, allImagesHaveLoaded]);

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
              style={{ visibility: allImagesHaveLoaded ? "visible" : "hidden" }}
              src={item.src}
              alt=""
              onLoad={() =>
                setImages((oldImages) =>
                  oldImages.map((oldImage) => {
                    const newImage = { ...oldImage };
                    if (newImage.src === item.src) {
                      newImage.loaded = true;
                    }
                    return newImage;
                  })
                )
              }
            />
          );
        })}
      </div>
      {children}
    </div>
  );
}

export default RotatingImageBackground;
