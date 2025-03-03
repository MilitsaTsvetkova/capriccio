import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { NodeData } from "../utils/types";

type UseFocusedNodeIndexProps = {
  nodes: NodeData[];
};

export const useFocusedNodeIndex = ({
  nodes,
}: UseFocusedNodeIndexProps): [number, Dispatch<SetStateAction<number>>] => {
  const [focusedNodeIndex, setFocusedNodeIndex] = useState(0);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") {
        setFocusedNodeIndex((prev) => Math.max(prev - 1, 0));
      }
      if (event.key === "ArrowDown") {
        setFocusedNodeIndex((prev) => Math.min(prev + 1, nodes.length - 1));
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [nodes]);

  return [focusedNodeIndex, setFocusedNodeIndex];
};
