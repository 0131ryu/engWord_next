import React, { useCallback, useState } from "react";
import ImagesZoomModal from "./ImagesZoomModal";

const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);
  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  if (images.length === 1) {
    return (
      <>
        <div className="scale-75 hover:scale-100 ease-in duration-500 cursor-pointer rounded-lg">
          <img
            src={`http://localhost:3005/${images[0]?.src}`}
            alt={images[0]?.src}
            className="rounded-lg"
            onClick={onZoom}
          />
        </div>
        {showImagesZoom && (
          <ImagesZoomModal images={images} onClose={onClose} />
        )}
      </>
    );
  }
  if (images.length === 2) {
    return (
      <>
        <div className="cursor-pointer w-1/2 inline-block">
          <img
            src={`http://localhost:3005/${images[0]?.src}`}
            alt={images[0]?.src}
            className="rounded-lg h-44"
            onClick={onZoom}
          />
        </div>
        <div className="cursor-pointer w-1/2 inline-block">
          <img
            src={`http://localhost:3005/${images[1]?.src}`}
            alt={images[0]?.src}
            className="rounded-lg h-44"
            onClick={onZoom}
          />
        </div>
        {showImagesZoom && (
          <ImagesZoomModal images={images} onClose={onClose} />
        )}
      </>
    );
  }
};

export default PostImages;
