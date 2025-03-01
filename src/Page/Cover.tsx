import { useRef } from "react";
import styles from "./Cover.module.css";

export const Cover = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeCoverImage = () => {
    inputRef.current?.click();
  };

  const onCoverImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const file = target?.files?.[0];
    console.log(file);
  };

  return (
    <div className={styles.cover}>
      <img src="./cover.jpg" alt="cover" className={styles.image} />
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
