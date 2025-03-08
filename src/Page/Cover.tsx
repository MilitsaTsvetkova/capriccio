import { useRef } from "react";
import { FileImage } from "../components/FileImage";
import { uploadImage } from "../utils/uploadImage";
import styles from "./Cover.module.css";

type CoverProps = {
  filePath?: string;
  changeCover: (filePath: string) => void;
};

export const Cover = ({ filePath, changeCover }: CoverProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeCoverImage = () => {
    inputRef.current?.click();
  };

  const onCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const file = target?.files?.[0];
    const result = await uploadImage(file);
    if (result?.filePath) {
      changeCover(result.filePath);
    }
  };

  return (
    <div className={styles.cover}>
      {filePath ? (
        <FileImage filePath={filePath} className={styles.image} />
      ) : (
        <img src="./cover.jpg" alt="cover" className={styles.image} />
      )}
      <button className={styles.button} onClick={onChangeCoverImage}>
        Change Cover
      </button>
      <input
        type="file"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={onCoverImageUpload}
      />
    </div>
  );
};
