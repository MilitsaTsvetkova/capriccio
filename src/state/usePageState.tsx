import { arrayMove } from "@dnd-kit/sortable";
import { NodeData, NodeType, Page } from "../utils/types";
import { updatePage } from "../utils/updatePage";
import { useSynchedState } from "./useSynchedState";

export const usePageState = (initialState: Page) => {
  const [page, setPage] = useSynchedState(initialState, updatePage);

  const addNode = (node: NodeData, index: number) => {
    setPage((draft) => {
      draft.nodes.splice(index, 0, node);
    });
  };

  const removeNodeByIndex = (index: number) => {
    setPage((draft) => {
      draft.nodes.splice(index, 1);
    });
  };

  const changeNodeValue = (index: number, value: string) => {
    setPage((draft) => {
      draft.nodes[index].value = value;
    });
  };

  const changeNodeType = (index: number, type: NodeType) => {
    setPage((draft) => {
      draft.nodes[index].type = type;
      draft.nodes[index].value = "";
    });
  };

  const setNodes = (nodes: NodeData[]) => {
    setPage((draft) => {
      draft.nodes = nodes;
    });
  };

  const setTitle = (title: string) => {
    setPage((draft) => {
      draft.title = title;
    });
  };
  const setCover = (cover: string) => {
    setPage((draft) => {
      draft.cover = cover;
    });
  };

  const reorderNodes = (firstId: string, secondId: string) => {
    setPage((draft) => {
      const firstIndex = page.nodes.findIndex((node) => node.id === firstId);
      const secondIndex = page.nodes.findIndex((node) => node.id === secondId);

      draft.nodes = arrayMove(draft.nodes, firstIndex, secondIndex);
    });
  };

  return {
    nodes: page.nodes,
    title: page.title,
    cover: page.cover,
    addNode,
    removeNodeByIndex,
    changeNodeValue,
    changeNodeType,
    setNodes,
    setTitle,
    setCover,
    reorderNodes,
  };
};
