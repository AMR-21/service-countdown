export type Clock = {
	weeks: number;
	weeksDays: number;
	totalDays: number;
	years: number;
	months: number;
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
};

export type CounterConfig = {
	mode?: "days" | "weeks" | "months";
	batchMonth?: string;
	batchYear?: string;
};
