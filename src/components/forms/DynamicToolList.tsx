/**
 * DynamicToolList - Manages list of AI tools with add/remove functionality
 */

import { useFieldArray, UseFieldArrayReturn, FieldErrors, Control } from "react-hook-form";
import { Plus } from "lucide-react";
import { ToolEntry } from "@/lib/schemas";
import { AuditFormData } from "@/lib/schemas";
import { ToolInputCard } from "./ToolInputCard";
import { EmptyState } from "./EmptyState";

export interface DynamicToolListProps {
  control: Control<AuditFormData>;
  fieldArray: UseFieldArrayReturn<AuditFormData, "tools">;
  errors: FieldErrors<AuditFormData>;
}

export function DynamicToolList({
  control,
  fieldArray,
  errors,
}: DynamicToolListProps) {
  const { fields, append, remove } = fieldArray;

  const handleAddTool = () => {
    append({
      id: crypto.randomUUID(),
      tool: "" as any,
      plan: "" as any,
      monthlySpend: 0,
      seats: 1,
    });
  };

  if (fields.length === 0) {
    return (
      <EmptyState
        title="No tools added yet"
        description="Start by adding your first AI tool to begin tracking your spending"
        actionLabel="Add First Tool"
        onAction={handleAddTool}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {fields.map((field, index) => (
          <ToolInputCard
            key={field.id}
            index={index}
            control={control}
            errors={errors}
            onRemove={() => remove(index)}
            isRemovable={fields.length > 1}
          />
        ))}
      </div>

      {/* Add Tool Button */}
      <button
        type="button"
        onClick={handleAddTool}
        className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-background/50 px-4 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors"
      >
        <Plus className="h-4 w-4" />
        Add Another Tool
      </button>

      {/* Error Summary */}
      {errors.tools && (
        <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
          <p className="font-medium">Please fix the following:</p>
          <p>{errors.tools.message}</p>
        </div>
      )}
    </div>
  );
}
