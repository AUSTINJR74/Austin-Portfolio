import { cn } from "@/lib/utils";

type Props = {
  label: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeader({ label, title, description, className }: Props) {
  return (
    <div className={cn("mb-14 md:mb-16", className)}>
      <div className="flex items-center gap-3">
        <span className="text-primary font-mono text-xs tracking-[0.22em] uppercase">
          {label}
        </span>
        <span className="text-muted-foreground/70 font-mono text-xs tracking-[0.22em]">
          ||
        </span>
        <div className="h-px w-10 bg-border" />
      </div>

      <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
        {title}
      </h2>

      {description ? (
        <p className="mt-4 text-muted-foreground max-w-2xl">
          {description}
        </p>
      ) : null}
    </div>
  );
}

