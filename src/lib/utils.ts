import { clsx, type ClassValue } from "clsx";
import {
  daysToWeeks,
  differenceInDays,
  intervalToDuration,
  subYears,
} from "date-fns";
import { twMerge } from "tailwind-merge";
import type { Clock } from "./types";
import confetti from "canvas-confetti";
import { clockAtom, store } from "./atoms";
import type { BATCHES } from "./constants";

let timerId: NodeJS.Timeout | undefined;
let confettiTimerId: NodeJS.Timeout | undefined;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 *
 *
 * @param num : number
 * @returns number
 * 0 => مفرد: 1 و >10
 * 1 => مثنى: 2
 * 2 => جمع: 0 و 3-10
 */
export function getPlurality(num: number) {
  return (num <= 10 && num > 2) || num === 0 ? 2 : num === 2 ? 1 : 0;
}

export function formatNum(num: number) {
  return new Intl.NumberFormat("ar-EG", {
    style: "decimal",
    useGrouping: false,
  }).format(num);
}

export function startTimer(target: string) {
  if (timerId) clearInterval(timerId);

  // for instant effect
  store.set(clockAtom, getClock(target));

  // the actual clock
  timerId = setInterval(() => {
    store.set(clockAtom, getClock(target));
    const diff = differenceInDays(target, Date.now());
    if (diff > 0 && diff <= 3 && !confettiTimerId) fireConfetti(30);
  }, 1000);
}

export function getClock(target: string) {
  const now = Date.now();
  const totalDays = differenceInDays(target, now);
  const weeks = daysToWeeks(totalDays);

  return {
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    months: 0,
    ...intervalToDuration({
      end: new Date(target),
      start: now,
    }),
    weeks,
    weeksDays: totalDays - weeks * 7,
    totalDays,
  } satisfies Clock;
}

export function fireConfetti(time = 10) {
  const duration = time * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  confettiTimerId = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      clearInterval(confettiTimerId);
      confettiTimerId = undefined;
      return;
    }

    const particleCount = 50 * (timeLeft / duration);

    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    });

    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    });
  }, 250);
}

export function isExtraYear(month: number) {
  return month === 0 || month === 3 || month === 6 || month === 9;
}

export function getRecruitmentDuration(
  batchDate: string,
  duration: number,
  addTraining: boolean
) {
  const endDate = new Date(batchDate);

  const hasExtraYear = isExtraYear(endDate.getMonth());

  const startDate = subYears(endDate, duration);
  startDate.setDate(1);

  if (hasExtraYear) {
    startDate.setMonth((startDate.getMonth() - 2) % 12);
  }

  // Add training duration
  if (addTraining) {
    startDate.setMonth(startDate.getMonth() - 1);
  } else {
    startDate.setMonth(startDate.getMonth() + 1);
  }

  return {
    passed: differenceInDays(Date.now(), startDate),
    total: differenceInDays(batchDate, startDate),
    startDate,
  };
}

export function getTargetDate(
  month: (typeof BATCHES)[number] | null,
  year: number | null
) {
  if (!month || !year) return "";
  return `${year}-${String(Number(+month - 1)).padStart(2, "0")}-25`;
}
