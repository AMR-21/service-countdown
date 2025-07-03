import { clsx, type ClassValue } from "clsx"
import { daysToWeeks, differenceInDays, intervalToDuration, subYears } from "date-fns";
import { twMerge } from "tailwind-merge"
import type { Clock } from "./types";
import confetti from "canvas-confetti";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      clearInterval(interval);
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

  return interval
}


export function isExtraYear(month: number) {
  return month === 1 || month === 4 || month === 7 || month === 10
}

export function getRecruitmentDuration(batchDate: string, duration: number, addTraining: boolean) {

  const endDate = new Date(batchDate)

  const hasExtraYear = isExtraYear(endDate.getMonth())


  // Add training duration
  if (addTraining)
    endDate.setMonth(endDate.getMonth() - 2)

  // Extra year fixation
  if (hasExtraYear) endDate.setMonth(endDate.getMonth() - 2)

  const startDate = subYears(endDate, duration)

  return {
    passed: differenceInDays(Date.now(), startDate),
    total: differenceInDays(batchDate, startDate)
  }

}