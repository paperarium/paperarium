/*
 * getImageDimensions.ts
 * author: evan kirkiles
 * created on Fri Sep 09 2022
 * 2022 the nobot space,
 */

export default async function getImageDimensions(dataURL: string) {
  return new Promise<{ width: number; height: number }>((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        height: img.height,
        width: img.width,
      });
    };
    img.src = dataURL;
  });
}
