/**
 * AuditForm - Main form component for AI spend audit
 */

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { auditFormSchema, AuditFormData } from "@/lib/schemas";
import { getAuditFormData, saveAuditFormData } from "@/lib/storage";
import { runAudit } from "@/lib/audit/engine";
import { saveAuditResults } from "@/lib/audit/storage";
import { NumberInput } from "./NumberInput";
import { UseCaseSelector } from "./UseCaseSelector";
import { DynamicToolList } from "./DynamicToolList";
import { FormSection } from "./FormSection";

export interface AuditFormProps {
  onSuccess?: (data: AuditFormData) => void;
  onError?: (error: Error) => void;
}

export function AuditForm({ onSuccess, onError }: AuditFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [isHydrated, setIsHydrated] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<AuditFormData>({
    resolver: zodResolver(auditFormSchema),
    mode: "onBlur",
    defaultValues: {
      teamSize: 1,
      primaryUseCase: "mixed",
      tools: [
        {
          id: crypto.randomUUID(),
          tool: "chatgpt",
          plan: "pro",
          monthlySpend: 0,
          seats: 1,
        },
      ],
    },
  });

  const fieldArray = useFieldArray({
    control,
    name: "tools",
  });

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = getAuditFormData();
    if (savedData) {
      reset(savedData);
    }
    setIsHydrated(true);
  }, [reset]);

  // Watch form data and auto-save to localStorage
  const watchedData = watch();
  useEffect(() => {
    if (!isHydrated) return;

    const timer = setTimeout(() => {
      saveAuditFormData(watchedData);
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }, 1000);

    return () => {
      clearTimeout(timer);
      setSaveStatus("saving");
    };
  }, [watchedData, isHydrated]);

  const onSubmit = async (data: AuditFormData) => {
    try {
      setIsLoading(true);
      
      // Save form data
      saveAuditFormData(data);

      // Run audit engine
      const auditResult = runAudit(data);

      // Save results
      saveAuditResults(auditResult);

      // Call success callback if provided
      if (onSuccess) {
        onSuccess(data);
      }

      // Navigate to results page
      router.push("/audit/results");
    } catch (error) {
      setSaveStatus("error");
      const err =
        error instanceof Error ? error : new Error("Form submission failed");
      if (onError) {
        onError(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-2 text-sm text-muted-foreground">Loading form...</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Team Information Section */}
      <FormSection
        title="Team Information"
        description="Tell us about your team and how you use AI"
        icon={<span className="text-lg">👥</span>}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Controller
            name="teamSize"
            control={control}
            render={({ field }) => (
              <NumberInput
                label="Team Size"
                placeholder="5"
                min="1"
                max="10000"
                error={errors.teamSize?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="primaryUseCase"
            control={control}
            render={({ field }) => (
              <UseCaseSelector
                label="Primary Use Case"
                error={errors.primaryUseCase?.message}
                {...field}
              />
            )}
          />
        </div>
      </FormSection>

      {/* AI Tools Section */}
      <FormSection
        title="AI Tool Spending"
        description="Add all the AI tools your team uses and their associated costs"
        icon={<span className="text-lg">🤖</span>}
      >
        <DynamicToolList
          control={control}
          fieldArray={fieldArray}
          errors={errors}
        />
      </FormSection>

      {/* Form Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          {saveStatus === "saving" && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Loader2 className="h-3 w-3 animate-spin" />
              Saving...
            </div>
          )}
          {saveStatus === "saved" && (
            <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
              <CheckCircle2 className="h-3 w-3" />
              Saved locally
            </div>
          )}
          {saveStatus === "error" && (
            <div className="flex items-center gap-2 text-xs text-destructive">
              <AlertCircle className="h-3 w-3" />
              Save failed
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || isSubmitting}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground transition-colors"
        >
          {isLoading || isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <span>Get Audit Report</span>
              <span>→</span>
            </>
          )}
        </button>
      </div>

      {/* Info Message */}
      <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-4 text-sm text-blue-900 dark:text-blue-200">
        <p className="font-medium">💡 Pro Tip</p>
        <p className="mt-1">
          Your form data is automatically saved locally. Refresh anytime without losing your progress.
        </p>
      </div>
    </form>
  );
}
