import { Cover } from "./Cover";
import { Title } from "./Title";

export const Page = () => {
  return (
    <>
      <Cover />
      <Title title="Node" onChangeTitle={() => {}} addNode={() => {}} />
    </>
  );
};
