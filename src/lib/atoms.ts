import { createStore } from "jotai";
import { atomWithStorage } from "jotai/utils";
import type { Clock } from "./types";

export const clockAtom = atomWithStorage<Clock | undefined>(
	"clock",
	localStorage.getItem("clock")
		? // biome-ignore lint/style/noNonNullAssertion: Type narrowing
			JSON.parse(localStorage.getItem("clock")!)
		: undefined,
);

export const store = createStore();
