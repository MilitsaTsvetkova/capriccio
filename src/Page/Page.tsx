import { BasicNode } from "../Node/BasicNode";
import { NodeData } from "../utils/types";
import { Cover } from "./Cover";
import { Title } from "./Title";

export const Page = () => {
  return (
    <>
      <Cover />
      <Title title="Node" onChangeTitle={() => {}} addNode={() => {}} />
      <BasicNode
        node={{
          id: "",
          type: "text",
          value: "",
        }}
        updateFocusedIndex={function (index: number): void {
          throw new Error("Function not implemented.");
        }}
        isFocused={false}
        index={0}
        addNode={function (node: NodeData, index: number): void {
          throw new Error("Function not implemented.");
        }}
        removeNodeByIndex={function (index: number): void {
          throw new Error("Function not implemented.");
        }}
        changeNodeValue={function (index: number, value: string): void {
          throw new Error("Function not implemented.");
        }}
      />
    </>
  );
};
