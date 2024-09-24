import { cn } from "@/lib/utils/shadcn-ui";

export function TypographyP({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-muted-foreground text-base", className)}>
      {children}
    </p>
  );
}
