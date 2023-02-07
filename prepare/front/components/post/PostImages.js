import React, { useCallback, useState } from "react";
import { backUrl } from "../../config/config";
import ImagesZoomModal from "./ImagesZoomModal";

const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);
  const [showImg, setShowImg] = useState("");
  const [showNum, setShowNum] = useState(0);

  const onZoom = useCallback(
    (imgName, num) => () => {
      setShowNum(num);
      setShowImg(imgName);
      setShowImagesZoom(true);
    },
    []
  );
  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  if (images?.length === 1) {
    return (
      <>
        <div className="flex justify-center cursor-pointer rounded-lg">
          <img
            src={`http://${backUrl}/${images[0]?.src}`}
            alt={images[0]?.src}
            className="rounded-lg shadow-xl min-h-[50px]"
            onClick={onZoom(images[0]?.src, 0)}
          />
        </div>
        {showImagesZoom && (
          <ImagesZoomModal
            images={images}
            onClose={onClose}
            showImg={showImg}
            showNum={showNum}
          />
        )}
      </>
    );
  }
  if (images?.length === 2) {
    return (
      <>
        <div className="cursor-pointer grid grid-cols-2 gap-x-2 gap-y-3">
          <img
            src={`http://${backUrl}/${images[0]?.src}`}
            alt={images[0]?.src}
            className="rounded-lg shadow-xl min-h-full"
            onClick={onZoom(images[0]?.src, 0)}
          />
          <img
            id="image2"
            src={`http://${backUrl}/${images[1]?.src}`}
            alt={images[0]?.src}
            className="rounded-lg shadow-xl min-h-full"
            onClick={onZoom(images[1]?.src, 1)}
          />

          {showImagesZoom && (
            <ImagesZoomModal
              images={images}
              onClose={onClose}
              showImg={showImg}
              showNum={showNum}
            />
          )}
        </div>
      </>
    );
  }
  if (images?.length === 3) {
    return (
      <>
        <div className="cursor-pointer grid grid-cols-2 gap-x-2 gap-y-3">
          <img
            src={`http://${backUrl}/${images[0]?.src}`}
            alt={images[0]?.src}
            className="rounded-lg shadow-xl min-h-full row-span-2"
            onClick={onZoom(images[0]?.src, 0)}
          />

          <img
            src={`http://${backUrl}/${images[1]?.src}`}
            alt={images[1]?.src}
            className="rounded-lg shadow-xl min-h-full"
            onClick={onZoom(images[1]?.src, 1)}
          />

          <img
            src={`http://${backUrl}/${images[2]?.src}`}
            alt={images[2]?.src}
            className="rounded-lg shadow-xl min-h-full"
            onClick={onZoom(images[2]?.src, 2)}
          />
        </div>
        {showImagesZoom && (
          <ImagesZoomModal
            images={images}
            onClose={onClose}
            showImg={showImg}
            showNum={showNum}
          />
        )}
      </>
    );
  }
  if (images?.length >= 4) {
    return (
      <>
        <div className="cursor-pointer grid grid-cols-2 gap-x-2 gap-y-3">
          <img
            src={`http://${backUrl}/${images[0]?.src}`}
            alt={images[0]?.src}
            className="rounded-lg shadow-xl min-h-full"
            onClick={onZoom(images[0]?.src, 0)}
          />

          <img
            src={`http://${backUrl}/${images[1]?.src}`}
            alt={images[1]?.src}
            className="rounded-lg shadow-xl min-h-full"
            onClick={onZoom(images[1]?.src, 1)}
          />

          <img
            src={`http://${backUrl}/${images[2]?.src}`}
            alt={images[2]?.src}
            className="rounded-lg shadow-xl min-h-full"
            onClick={onZoom(images[2]?.src, 2)}
          />
          <img
            src={`http://${backUrl}/${images[3]?.src}`}
            alt={images[3]?.src}
            className="rounded-lg shadow-xl min-h-full"
            onClick={onZoom(images[3]?.src, 3)}
          />
        </div>
        {showImagesZoom && (
          <ImagesZoomModal
            images={images}
            onClose={onClose}
            showImg={showImg}
            showNum={showNum}
          />
        )}
      </>
    );
  }
};

export default PostImages;
