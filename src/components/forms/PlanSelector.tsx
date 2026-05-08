/**
 * PlanSelector - Dropdown to select a plan type
 */

import { forwardRef, SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { PLAN_TYPES } from "@/lib/constants";

export interface PlanSelectorProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  label?: string;
  error?: string;
  placeholder?: string;
}

export const PlanSelector = forwardRef<HTMLSelectElement, PlanSelectorProps>(
  ({ label, error, placeholder = "Select a plan...", ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={`w-full appearance-none rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-colors ${
              error ? "border-destructive focus:border-destructive focus:ring-destructive/10" : ""
            }`}
            {...props}
          >
            <option value="">{placeholder}</option>
            {PLAN_TYPES.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
        {error && <p className="text-xs font-medium text-destructive">{error}</p>}
      </div>
    );
  }
);

PlanSelector.displayName = "PlanSelector";
