/**
 * NumberInput - Reusable number input wrapper with error handling
 */

import { forwardRef, InputHTMLAttributes } from "react";

export interface NumberInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ label, error, hint, icon, className = "", ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            type="number"
            className={`w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-colors ${
              icon ? "pl-10" : ""
            } ${error ? "border-destructive focus:border-destructive focus:ring-destructive/10" : ""} ${className}`}
            {...props}
          />
        </div>
        {error && <p className="text-xs font-medium text-destructive">{error}</p>}
        {hint && !error && (
          <p className="text-xs text-muted-foreground">{hint}</p>
        )}
      </div>
    );
  }
);

NumberInput.displayName = "NumberInput";
