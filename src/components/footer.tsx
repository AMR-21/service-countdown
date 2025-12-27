import { IconBrandGithub, IconConfetti, IconShare2 } from "@tabler/icons-react";
import type { VariantProps } from "class-variance-authority";
import { differenceInDays } from "date-fns";
import { toast } from "sonner";
import { useMonth } from "@/hooks/use-month";
import { useYear } from "@/hooks/use-year";
import { fireConfetti, getTargetDate } from "@/lib/utils";
import DiagonalPattern from "./diagonal-pattern";
import { ThemeToggle } from "./theme-toggle";
import { Button, type buttonVariants } from "./ui/button";

export function Footer() {
	const { month } = useMonth();
	const { year } = useYear();
	const target = getTargetDate(month, year);
	const diff = differenceInDays(target, Date.now());

	return (
		<div
			dir="rtl"
			className="flex items-center  *:size-10 *:not-last:border-l *:not-last:border-border"
		>
			<ThemeToggle />

			<FooterBtn
				title="Confetti Igniter"
				aria-label="Confetti Igniter"
				disabled={diff > 90}
				onClick={() => fireConfetti()}
			>
				<IconConfetti />
			</FooterBtn>
			<div className="grow">
				<DiagonalPattern className="h-full">
					{diff <= 90 && (
						<div className="w-fit mx-auto px-6 border-x bg-background h-full flex items-center justify-center font-ruqaa">
							<p>رديف</p>
						</div>
					)}
				</DiagonalPattern>
			</div>
			{/* <FooterBtn title="Screenshot">
        <Aperture />
      </FooterBtn> */}
			<FooterBtn
				title="Share"
				aria-label="Share"
				onClick={() => {
					try {
						navigator.clipboard.writeText(window.location.href);
						toast.success("تم نسخ الرابط", {
							position: "top-center",
							duration: 1200,
						});
					} catch {
						console.error("Failed to copy the URL");
					}
				}}
			>
				<IconShare2 />
			</FooterBtn>
			<a
				target="_blank"
				rel="noopener noreferrer"
				href="https://github.com/AMR-21/service-countdown"
			>
				<FooterBtn title="Github Repo" aria-label="Github Repo">
					<IconBrandGithub />
				</FooterBtn>
			</a>
		</div>
	);
}

function FooterBtn({
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	}) {
	return (
		<Button
			size="icon-sm"
			variant="ghost"
			className="aspect-square size-full"
			{...props}
		/>
	);
}
