import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { nanoid } from "nanoid";
import { NodeContainer } from "../Node/NodeContainer";
import { useAppState } from "../state/AppStateContext";
import { Cover } from "./Cover";
import { Spacer } from "./Spacer";
import { Title } from "./Title";
import { useFocusedNodeIndex } from "./useFocusedNodeIndex";

export const Page = () => {
  const { nodes, title, setTitle, addNode, reorderNodes } = useAppState();
  const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({
    nodes,
  });

  const handleDragEvent = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over?.id && active.id !== over?.id) {
      reorderNodes(active.id as string, over.id as string);
    }
  };

  return (
    <>
      <Cover />
      <div>
        <Title title={title} onChangeTitle={setTitle} addNode={addNode} />
        <DndContext onDragEnd={handleDragEvent}>
          <SortableContext strategy={verticalListSortingStrategy} items={nodes}>
            {nodes.map((node, index) => (
              <NodeContainer
                key={node.id}
                node={node}
                updateFocusedIndex={setFocusedNodeIndex}
                isFocused={focusedNodeIndex === index}
                index={index}
              />
            ))}
          </SortableContext>
          <DragOverlay />
        </DndContext>
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
