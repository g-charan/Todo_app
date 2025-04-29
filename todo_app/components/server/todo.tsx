"use server";
import axios from "axios";
import { revalidatePath } from "next/cache";

const url = "http://localhost:5000/api/todos";

export const getData = async () => {
  const res = await fetch(`${url}/getTodos`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  console.log(data);
  revalidatePath("/pages/todo");
  return data;
};

export const postTodo = async (name: string) => {
  const res = await axios.post(`${url}/postTodos`, {
    name: name,
  });
  revalidatePath("/pages/todo");
  return "success";
};

export const deleteTodo = async (pos: any) => {
  const res = await axios.delete(`${url}/deleteTodos/${pos}`);
  revalidatePath("/pages/todo");
  return "success";
};
