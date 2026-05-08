/**
 * EmptyState - Empty state component when no tools are added
 */

import { Plus } from "lucide-react";

export interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title,
  description,
  actionLabel = "Add a tool",
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-background/50 p-8 text-center">
      <div className="mb-4 rounded-full bg-primary/10 p-3">
        <Plus className="h-6 w-6 text-primary" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mb-6 max-w-sm text-sm text-muted-foreground">
        {description}
      </p>
      {onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          {actionLabel}
        </button>
      )}
    </div>
  );
}
