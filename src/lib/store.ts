import type { User } from "firebase/auth";
import { writable, readable } from "svelte/store";

export const loginInfo = writable<User>();
export const budgetFrom = writable<number>();
export const budgetTo = writable<number>();
export const uploadTypeChosen = writable<string>();
export const commentAbout = writable<string>();
export const commentText = writable<string>();
export const lookingFor = writable<string>();
export const ClookingFor = writable<string>();
export const searchedFor = writable<string>("");
export const onlyI = writable<boolean>(false);
export const Iarray = writable<string[]>([])
export const myUpload = writable<boolean>(false)
export const FdeletedPost = writable<boolean>(false)
export const searchUser = writable<string>("");