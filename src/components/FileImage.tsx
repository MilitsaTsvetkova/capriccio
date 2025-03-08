import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import styles from "../utils.module.css";
import { Loader } from "./Loader";

type FileImageProps = {
  filePath: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

export const FileImage = ({ filePath, ...props }: FileImageProps) => {
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async (filePath: string) => {
      setIsLoading(true);
      const { data } = await supabase.storage.from("images").download(filePath);
      if (data) {
        const url = URL.createObjectURL(data);
        setImage(url);
      }
      setIsLoading(false);
    };

    if (filePath && filePath.length > 0) {
      fetchImage(filePath);
    }
  }, [filePath]);

  if (isLoading) {
    return (
      <div className={styles.centeredFlex}>
        <Loader />
      </div>
    );
  }

  return <img src={image} alt={filePath} {...props} />;
};
