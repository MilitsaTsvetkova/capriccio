import { nanoid } from "nanoid";
import { useEffect, useRef } from "react";
import { NodeData } from "../utils/types";
import styles from "./Title.module.css";

type TitleProps = {
  title: string;
  onChangeTitle: (title: string) => void;
  addNode: (node: NodeData, index: number) => void;
};

export const Title = ({ title, onChangeTitle, addNode }: TitleProps) => {
  const headerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const isFocused = document.activeElement == headerRef.current;
    if (!isFocused && headerRef.current) {
      headerRef.current.textContent = title;
    }
  }, [title]);

  return (
    <div className={styles.container}>
      <h1
        ref={headerRef}
        className={styles.title}
        contentEditable
        suppressContentEditableWarning
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addNode(
              {
                id: nanoid(),
                type: "text",
                value: title,
              },
              0
            );
          }
        }}
        onInput={(e) => {
          onChangeTitle(e.currentTarget.textContent ?? "");
        }}
      >
        {title}
      </h1>
    </div>
  );
};
