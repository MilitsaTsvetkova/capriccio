import { nanoid } from "nanoid";
import { useState } from "react";
import { BasicNode } from "../Node/BasicNode";
import { NodeData } from "../utils/types";
import { Cover } from "./Cover";
import { Spacer } from "./Spacer";
import { Title } from "./Title";
import { useFocusedNodeIndex } from "./useFocusedNodeIndex";

export const Page = () => {
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({
    nodes,
  });
  const [title, setTitle] = useState("Default Title");

  const addNote = (node: NodeData, index: number) => {
    const newNodes = [...nodes];
    newNodes.splice(index, 0, node);
    setNodes(newNodes);
  };

  const removeNodeByIndex = (index: number) => {
    const newNodes = [...nodes];
    newNodes.splice(index, 1);
    setNodes(newNodes);
  };

  const changeNodeValue = (index: number, value: string) => {
    const newNodes = [...nodes];
    newNodes[index].value = value;
    setNodes(newNodes);
  };

  return (
    <>
      <Cover />
      <div>
        <Title title={title} onChangeTitle={setTitle} addNode={addNote} />
        {nodes.map((node, index) => (
          <BasicNode
            key={node.id}
            node={node}
            updateFocusedIndex={setFocusedNodeIndex}
            isFocused={focusedNodeIndex === index}
            index={index}
            addNode={addNote}
            removeNodeByIndex={removeNodeByIndex}
            changeNodeValue={changeNodeValue}
          />
        ))}
        <Spacer
          showHint={!nodes.length}
          onClick={() => {
            addNote(
              {
                id: nanoid(),
                type: "text",
                value: "",
              },
              nodes.length
            );
          }}
        />
      </div>
    </>
  );
};
