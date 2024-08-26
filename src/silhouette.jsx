import React, { useRef, useEffect } from "react";

const SilhouetteImage = ({ width, height, imageURL }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!imageURL) {
      //   console.error("Image URL is not provided");
      return;
    }

    const loadImage = async () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.src = imageURL;

      await new Promise((resolve) => {
        image.onload = () => {
          resolve();
        };
      });

      canvas.width = width;
      canvas.height = height;

      // 画像をキャンバスに描画
      context.drawImage(image, 0, 0, width, height);

      // キャンバスのピクセルデータを取得
      const imageData = context.getImageData(0, 0, width, height);
      const data = imageData.data;

      // 背景の色を取得（左上のピクセルの色を背景色とする）
      const backgroundColor = {
        red: data[0],
        green: data[1],
        blue: data[2],
      };

      // シルエット化と黒で塗りつぶし
      for (let i = 0; i < data.length; i += 4) {
        // 背景色と同じ場合は白で塗りつぶす
        if (
          data[i] === backgroundColor.red &&
          data[i + 1] === backgroundColor.green &&
          data[i + 2] === backgroundColor.blue
        ) {
          data[i] = 255; // 赤
          data[i + 1] = 255; // 緑
          data[i + 2] = 255; // 青
        } else {
          data[i] = 0; // 赤
          data[i + 1] = 0; // 緑
          data[i + 2] = 0; // 青
        }
      }

      // シルエット画像をキャンバスに再描画
      context.putImageData(imageData, 0, 0);
    };

    loadImage();
  }, [width, height, imageURL]);

  return <canvas ref={canvasRef} />;
};

export default SilhouetteImage;
