import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("skeleton", className)} {...props} />;
}

export function ProjectCardSkeleton() {
  return (
    <div className="flex flex-col glass border border-border/40 rounded-2xl overflow-hidden">
      <div className="skeleton h-40 rounded-none opacity-60" />
      <div className="p-6 space-y-4">
        <Skeleton className="h-5 w-3/4" />
        <div className="space-y-2">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-5/6" />
          <Skeleton className="h-3.5 w-4/6" />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {[80, 64, 72, 56].map((w) => (
            <Skeleton key={w} className="h-5 rounded-md" style={{ width: w }} />
          ))}
        </div>
        <div className="pt-4 border-t border-border/50">
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
}

export function SkillCategorySkeleton() {
  return (
    <div className="glass border border-border/40 rounded-2xl p-7">
      <Skeleton className="h-6 w-28 rounded-lg mb-6" />
      <div className="space-y-5">
        {[75, 85, 60, 70].map((w) => (
          <div key={w} className="space-y-1.5">
            <div className="flex justify-between items-center">
              <Skeleton className="h-4" style={{ width: w + 40 }} />
              <Skeleton className="h-4 w-8" />
            </div>
            <Skeleton className="h-1.5 w-full rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function TechIconSkeleton() {
  return (
    <div className="glass border border-border/40 rounded-xl p-4 flex flex-col items-center gap-2.5">
      <Skeleton className="w-9 h-9 rounded-lg" />
      <Skeleton className="h-3 w-12" />
    </div>
  );
}

export function ExperienceCardSkeleton() {
  return (
    <div className="relative flex gap-6 pb-12">
      <Skeleton className="flex-shrink-0 w-10 h-10 rounded-xl" />
      <div className="flex-1 glass border border-border/40 rounded-2xl p-7 space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-6 w-52" />
            <Skeleton className="h-5 w-36" />
          </div>
          <div className="flex flex-col gap-1.5 items-end">
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-3.5 w-32" />
            <Skeleton className="h-3.5 w-24" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-5/6" />
        </div>
        <div className="space-y-2">
          {[0, 1, 2].map((i) => <Skeleton key={i} className="h-3.5 w-4/5" />)}
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {[64, 72, 80, 56, 68].map((w) => (
            <Skeleton key={w} className="h-6 rounded-lg" style={{ width: w }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="glass border border-border/40 rounded-2xl p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Skeleton className="h-3 w-3 rounded-full" />
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-16" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-4/5" />
      </div>
      <div className="space-y-1.5">
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-5/6" />
        <Skeleton className="h-3.5 w-3/4" />
      </div>
      <div className="flex gap-1.5 flex-wrap">
        {[56, 48, 64].map((w) => (
          <Skeleton key={w} className="h-5 rounded-md" style={{ width: w }} />
        ))}
      </div>
      <Skeleton className="h-4 w-32" />
    </div>
  );
}
