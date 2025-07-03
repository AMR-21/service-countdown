import { fireConfetti } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { Button, buttonVariants } from "./ui/button";
import { PartyPopper, Share } from "lucide-react";
import githubIcon from "@/assets/github.svg";
import type { VariantProps } from "class-variance-authority";
import DiagonalPattern from "./diagonal-pattern";
import { toast } from "sonner";

export function Footer() {
  return (
    <div
      dir="rtl"
      className="flex items-center  [&>*]:size-10 [&>*]:not-last:border-l [&>*]:not-last:border-border"
    >
      <ThemeToggle />

      <FooterBtn title="Confetti Igniter" onClick={() => fireConfetti()}>
        <PartyPopper />
      </FooterBtn>
      <div className="grow">
        <DiagonalPattern anchors={false} className="h-full" />
      </div>
      {/* <FooterBtn title="Screenshot">
        <Aperture />
      </FooterBtn> */}
      <FooterBtn
        title="Share"
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
        <Share />
      </FooterBtn>
      <a target="_blank" href="https://github.com/AMR-21/service-countdown">
        <FooterBtn title="Github Repo">
          <img
            src={githubIcon}
            className="size-4 dark:invert "
            alt="Github Icon"
          />
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
    <Button size="icon" variant="ghost" className="aspect-square" {...props} />
  );
}
