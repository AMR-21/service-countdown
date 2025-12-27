import { atom, createStore } from "jotai";
import type { Clock } from "./types";

export const clockAtom = atom<Clock | undefined>(undefined);

export const store = createStore();
