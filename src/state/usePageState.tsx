import { useImmer } from "use-immer";
import { NodeData, NodeType, Page } from "../utils/types";
export const usePageState = (initialState: Page) => {
  const [page, setPage] = useImmer<Page>(initialState);

  const addNote = (node: NodeData, index: number) => {
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

  return {
    nodes: page.nodes,
    title: page.title,
    cover: page.cover,
    addNote,
    removeNodeByIndex,
    changeNodeValue,
    changeNodeType,
    setNodes,
    setTitle,
    setCover,
  };
};
