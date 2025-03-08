import { supabase } from "../supabaseClient";

export const uploadImage = async (file?: File) => {
  try {
    if (!file) {
      throw new Error("You must select an image to upload");
    }

    const fileExtension = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExtension}`;
    const filePath = fileName;
    await supabase.storage.from("images").upload(filePath, file);
    return { filePath, fileName };
  } catch (error: unknown) {
    alert(error);
  }
};
