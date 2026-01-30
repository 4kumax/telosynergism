import { cn } from "@/lib/utils";

type CalloutProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export default function Callout({ title, children, className }: CalloutProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-muted/60 p-5 text-sm text-muted-foreground",
        className
      )}
    >
      {title && <div className="mb-2 text-xs font-semibold uppercase">{title}</div>}
      {children}
    </div>
  );
}
