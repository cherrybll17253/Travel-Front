import type { User } from "firebase/auth";
import { writable, readable } from "svelte/store";

export const loginInfo = writable<User>();
export const budgetFrom = writable<number>();
export const budgetTo = writable<number>();
