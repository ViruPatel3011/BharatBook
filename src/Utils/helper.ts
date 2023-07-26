import { useRef, useCallback } from "react";

//Below method is used for Pagination
const useLastItemObserver = (
  loading: boolean,
  hasMore: boolean,
  setPageNumber: (page: number) => void
) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastPost = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, setPageNumber]
  );

  return lastPost;
};

export default useLastItemObserver;

//Below method is used for convert image into base64 string
export const base64converter = (imageBlob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      const base64Data = fileReader.result as string;
      const base64String = base64Data.split(",")[1];
      resolve(base64String);
    };
    fileReader.onerror = reject;
    fileReader.readAsDataURL(imageBlob);
  });
};

//Below method is used for reduce image size when uploaded
export const resizeImage = (imageFile: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxWidth = 500;
        const maxHeight = 500;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (resizedImage) => {
            const file = new File([resizedImage], imageFile.name, {
              type: "image/jpeg",
              lastModified: Date.now(),
            });
            resolve(file);
          },
          "image/jpeg",
          0.75
        );
      };
      img.src = e.target.result;
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(imageFile);
  });
};
