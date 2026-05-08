/**
 * ToolInputCard - Individual AI tool entry card
 */

import { Controller, FieldErrors } from "react-hook-form";
import { Trash2 } from "lucide-react";
import { ToolEntry } from "@/lib/schemas";
import { NumberInput } from "./NumberInput";
import { ToolSelector } from "./ToolSelector";
import { PlanSelector } from "./PlanSelector";
import { getToolById } from "@/lib/constants";

export interface ToolInputCardProps {
  index: number;
  onRemove: () => void;
  control: any;
  errors: FieldErrors<{ tools: ToolEntry[] }>;
  isRemovable: boolean;
}

export function ToolInputCard({
  index,
  onRemove,
  control,
  errors,
  isRemovable,
}: ToolInputCardProps) {
  const toolError = errors.tools?.[index];
  const fieldNamePrefix = `tools.${index}` as const;

  return (
    <div className="rounded-lg border border-border bg-card p-5 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-4">
          {/* Tool Selection */}
          <Controller
            name={`${fieldNamePrefix}.tool`}
            control={control}
            render={({ field }) => (
              <ToolSelector
                label="AI Tool"
                placeholder="Select a tool..."
                error={toolError?.tool?.message}
                {...field}
              />
            )}
          />

          {/* Grid layout for Plan, Spend, and Seats on larger screens */}
          <div className="grid gap-4 sm:grid-cols-3">
            {/* Plan Selection */}
            <Controller
              name={`${fieldNamePrefix}.plan`}
              control={control}
              render={({ field }) => (
                <PlanSelector
                  label="Plan"
                  placeholder="Select plan..."
                  error={toolError?.plan?.message}
                  {...field}
                />
              )}
            />

            {/* Monthly Spend */}
            <Controller
              name={`${fieldNamePrefix}.monthlySpend`}
              control={control}
              render={({ field }) => (
                <NumberInput
                  label="Monthly Spend"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  error={toolError?.monthlySpend?.message}
                  {...field}
                />
              )}
            />

            {/* Seats */}
            <Controller
              name={`${fieldNamePrefix}.seats`}
              control={control}
              render={({ field }) => (
                <NumberInput
                  label="Number of Seats"
                  placeholder="1"
                  min="1"
                  error={toolError?.seats?.message}
                  {...field}
                />
              )}
            />
          </div>
        </div>

        {/* Remove Button */}
        {isRemovable && (
          <button
            type="button"
            onClick={onRemove}
            className="mt-8 inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
            aria-label="Remove tool"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}
