import { nanoid } from "nanoid";
import { Page } from "./types";

export const createPage = (): Page => {
  const slug = nanoid();
  const id = nanoid();

  return {
    title: "Untitled",
    cover: "cover.jpg",
    nodes: [],
    slug,
    id,
  };
};
