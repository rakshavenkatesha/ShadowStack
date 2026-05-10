/**
 * Lead capture form component
 * Collects email, company name, and role
 * Includes honeypot field for abuse protection
 */

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Check, AlertCircle } from "lucide-react";
import { leadCaptureSchema, LeadCaptureFormData } from "@/lib/validation";

interface LeadCaptureFormProps {
  onSuccess: () => void;
  isLoading?: boolean;
}

export function LeadCaptureForm({
  onSuccess,
  isLoading = false,
}: LeadCaptureFormProps) {
  const [submitState, setSubmitState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadCaptureFormData>({
    resolver: zodResolver(leadCaptureSchema),
  });

  const onSubmit = async (data: LeadCaptureFormData) => {
    setSubmitState("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/leads/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit form");
      }

      setSubmitState("success");
      reset();
      
      // Call callback after success
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } catch (error) {
      setSubmitState("error");
      setErrorMessage(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  };

  if (submitState === "success") {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center dark:border-green-900 dark:bg-green-900/20">
        <div className="flex justify-center mb-4">
          <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="mb-2 font-semibold text-green-900 dark:text-green-100">
          Thank you!
        </h3>
        <p className="text-sm text-green-800 dark:text-green-200">
          We've received your information. Check your email for audit confirmation and optimization insights.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-foreground"
        >
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          {...register("email")}
          type="email"
          id="email"
          placeholder="you@company.com"
          className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          disabled={isLoading || submitState === "loading"}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Company Name Field */}
      <div>
        <label
          htmlFor="companyName"
          className="block text-sm font-medium text-foreground"
        >
          Company Name <span className="text-xs text-muted-foreground">(optional)</span>
        </label>
        <input
          {...register("companyName")}
          type="text"
          id="companyName"
          placeholder="Your startup name"
          className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          disabled={isLoading || submitState === "loading"}
        />
        {errors.companyName && (
          <p className="mt-1 text-xs text-red-500">
            {errors.companyName.message}
          </p>
        )}
      </div>

      {/* Role Field */}
      <div>
        <label
          htmlFor="role"
          className="block text-sm font-medium text-foreground"
        >
          Your Role <span className="text-xs text-muted-foreground">(optional)</span>
        </label>
        <input
          {...register("role")}
          type="text"
          id="role"
          placeholder="e.g. CTO, Head of Finance"
          className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          disabled={isLoading || submitState === "loading"}
        />
        {errors.role && (
          <p className="mt-1 text-xs text-red-500">{errors.role.message}</p>
        )}
      </div>

      {/* Honeypot field (hidden from users) */}
      <input
        {...register("website")}
        type="hidden"
        id="website"
        defaultValue=""
      />

      {/* Error Message */}
      {submitState === "error" && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 flex items-start gap-3 dark:border-red-900 dark:bg-red-900/20">
          <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-red-700 dark:text-red-200">
            {errorMessage}
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || submitState === "loading"}
        className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {submitState === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Continue"
        )}
      </button>

      {/* Trust Indicator */}
      <p className="text-xs text-muted-foreground text-center">
        Your data is secure and will never be shared. See our{" "}
        <a href="#" className="text-primary hover:underline">
          privacy policy
        </a>
      </p>
    </form>
  );
}
