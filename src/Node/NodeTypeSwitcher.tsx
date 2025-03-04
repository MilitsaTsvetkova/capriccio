import { NodeData, NodeType } from "../utils/types";
import { BasicNode } from "./BasicNode";

type NodeTypeSwitcherProps = {
  node: NodeData;
  updateFocusedIndex: (index: number) => void;
  isFocused: boolean;
  index: number;
};

const textNodeTypes: NodeType[] = [
  "text",
  "heading1",
  "heading2",
  "heading3",
  "list",
];

export const NodeTypeSwitcher = ({
  node,
  updateFocusedIndex,
  isFocused,
  index,
}: NodeTypeSwitcherProps) => {
  if (textNodeTypes.includes(node.type)) {
    return (
      <BasicNode
        node={node}
        updateFocusedIndex={updateFocusedIndex}
        isFocused={isFocused}
        index={index}
      />
    );
  }

  return null;
};
