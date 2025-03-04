import { nanoid } from "nanoid";
import {
  FormEventHandler,
  KeyboardEventHandler,
  useEffect,
  useRef,
} from "react";
import { useAppState } from "../state/AppStateContext";
import { NodeData } from "../utils/types";
import styles from "./Node.module.css";

type BasicNodeProps = {
  node: NodeData;
  updateFocusedIndex: (index: number) => void;
  isFocused: boolean;
  index: number;
};

export const BasicNode = ({
  node,
  updateFocusedIndex,
  isFocused,
  index,
}: BasicNodeProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  const { addNode, removeNodeByIndex, changeNodeValue } = useAppState();

  useEffect(() => {
    if (isFocused && nodeRef.current) {
      nodeRef.current.focus();
    } else {
      nodeRef.current?.blur();
    }
  }, [isFocused]);

  useEffect(() => {
    if (nodeRef.current && !isFocused) {
      nodeRef.current.textContent = node.value;
    }
  }, [node]);

  const handleInput: FormEventHandler<HTMLDivElement> = ({
    currentTarget: { textContent },
  }) => {
    changeNodeValue(index, textContent ?? "");
  };

  const handleClick = () => {
    updateFocusedIndex(index);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    const target = event.target as HTMLDivElement;
    const key = event.key;

    if (key === "Enter") {
      event.preventDefault();
      if (target?.textContent?.[0] === "/") {
        return;
      }
      addNode(
        {
          id: nanoid(),
          type: node.type,
          value: "",
        },
        index + 1
      );
      updateFocusedIndex(index + 1);
    }

    if (key === "Backspace") {
      if (target?.textContent?.length === 0) {
        event.preventDefault();
        removeNodeByIndex(index);
        updateFocusedIndex(index - 1);
      } else if (window?.getSelection()?.anchorOffset === 0) {
        event.preventDefault();
        removeNodeByIndex(index - 1);
        updateFocusedIndex(index - 1);
      }
    }
  };

  return (
    <div
      className={styles.node}
      contentEditable
      suppressContentEditableWarning
      ref={nodeRef}
      onInput={handleInput}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    ></div>
  );
};
