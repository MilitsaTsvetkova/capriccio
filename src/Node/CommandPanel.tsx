import cx from "classnames";
import { useEffect, useState } from "react";
import { NodeType } from "../utils/types";
import styles from "./CommandPanel.module.css";
import { useOverflowsScreenBottom } from "./useOverflowsScreenBottom";

type CommandPanelProps = {
  nodeText: string;
  onSelectItem: (nodeType: NodeType) => void;
};

type SupportedNodeTypes = {
  name: string;
  value: NodeType;
};

const supportedNodeTypes: SupportedNodeTypes[] = [
  { name: "Text", value: "text" },
  { name: "Image", value: "image" },
  { name: "List", value: "list" },
  { name: "Page", value: "page" },
  { name: "Image", value: "image" },
  { name: "Heading 1", value: "heading1" },
  { name: "Heading 2", value: "heading2" },
  { name: "Heading 3", value: "heading3" },
  { name: "Page", value: "page" },
];

export const CommandPanel = ({ nodeText, onSelectItem }: CommandPanelProps) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  const { ref, overflows } = useOverflowsScreenBottom();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        onSelectItem(supportedNodeTypes[selectedItemIndex].value);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedItemIndex, onSelectItem]);

  useEffect(() => {
    const normalizedValue = nodeText.toLocaleLowerCase().replace(/\//, "");
    setSelectedItemIndex(
      supportedNodeTypes.findIndex(({ value }) => value.match(normalizedValue))
    );
  }, [nodeText]);

  return (
    <div
      ref={ref}
      className={cx(styles.panel, { [styles.reverse]: overflows })}
    >
      <div className={styles.title}>Blocks</div>
      <ul>
        {supportedNodeTypes.map((type, index) => {
          const selected = selectedItemIndex === index;
          return (
            <li
              key={type.value}
              onClick={() => onSelectItem(type.value)}
              className={cx({ [styles.selected]: selected })}
            >
              {type.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
