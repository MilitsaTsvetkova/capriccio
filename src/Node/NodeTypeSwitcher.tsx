import { NodeData, NodeType } from "../utils/types";
import { BasicNode } from "./BasicNode";
import { PageNode } from "./PageNode";

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

  if (node.type === "page") {
    return <PageNode node={node} isFocused={isFocused} index={index} />;
  }
  return null;
};
