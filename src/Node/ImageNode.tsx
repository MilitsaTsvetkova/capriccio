import cx from "classnames";
import { ChangeEvent, useEffect, useRef } from "react";
import { FileImage } from "../components/FileImage";
import { useAppState } from "../state/AppStateContext";
import { NodeData } from "../utils/types";
import { uploadImage } from "../utils/uploadImage";
import styles from "./Node.module.css";

type ImageNodeProps = {
  node: NodeData;
  isFocused: boolean;
  index: number;
};

export const ImageNode = ({ node, isFocused, index }: ImageNodeProps) => {
  const { removeNodeByIndex, changeNodeValue, changeNodeType } = useAppState();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
      if (event.key === "Backspace") {
        removeNodeByIndex(index);
      }

      if (event.key === "Enter") {
        fileInputRef.current?.click();
      }
    };

    if (isFocused) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFocused, index, node, removeNodeByIndex]);

  useEffect(() => {
    if (!node.value || node.value.length === 0) {
      fileInputRef.current?.click();
    }
  }, [node.value]);

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    if (!target.files) {
      changeNodeType(index, "text");
    }
    try {
      const file = target.files?.[0];
      if (file) {
        const result = await uploadImage(file);
        if (result?.filePath) {
          changeNodeValue(index, result.filePath);
        }
      }
    } catch (error) {
      changeNodeType(index, "text");
    }
  };

  return (
    <div
      className={cx(styles.node, styles.image, {
        [styles.focused]: isFocused,
      })}
    >
      <FileImage filePath={node.value} />
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleImageUpload}
      />
    </div>
  );
};
