import { nanoid } from "nanoid";
import { NodeTypeSwitcher } from "../Node/NodeTypeSwitcher";
import { useAppState } from "../state/AppStateContext";
import { Cover } from "./Cover";
import { Spacer } from "./Spacer";
import { Title } from "./Title";
import { useFocusedNodeIndex } from "./useFocusedNodeIndex";

export const Page = () => {
  const { nodes, title, setTitle, addNode } = useAppState();
  const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({
    nodes,
  });

  return (
    <>
      <Cover />
      <div>
        <Title title={title} onChangeTitle={setTitle} addNode={addNode} />
        {nodes.map((node, index) => (
          <NodeTypeSwitcher
            key={node.id}
            node={node}
            updateFocusedIndex={setFocusedNodeIndex}
            isFocused={focusedNodeIndex === index}
            index={index}
          />
        ))}
        <Spacer
          showHint={!nodes.length}
          onClick={() => {
            addNode(
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
