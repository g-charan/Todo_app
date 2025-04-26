"use server";
import { revalidatePath } from "next/cache";

const url = "http://localhost:5000";

export const getData = async () => {
  const res = await fetch("http://localhost:5000/getTodos");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  console.log(data);
  return data;
  console.log("working");
  revalidatePath("/pages/todo");
};
