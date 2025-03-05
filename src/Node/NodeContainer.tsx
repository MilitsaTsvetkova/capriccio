import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { NodeData } from "../utils/types";
import styles from "./NodeContainer.module.css";
import { NodeTypeSwitcher } from "./NodeTypeSwitcher";

type NodeContainerProps = {
  node: NodeData;
  updateFocusedIndex: (index: number) => void;
  isFocused: boolean;
  index: number;
};

export const NodeContainer = ({
  node,
  updateFocusedIndex,
  isFocused,
  index,
}: NodeContainerProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: node.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      {...attributes}
      ref={setNodeRef}
      style={style}
      className={styles.container}
    >
      <div {...listeners} className={styles.dragHandle}>
        ⠿
      </div>
      <NodeTypeSwitcher
        node={node}
        updateFocusedIndex={updateFocusedIndex}
        isFocused={isFocused}
        index={index}
      />
    </div>
  );
};
