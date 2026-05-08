/**
 * ToolSelector - Dropdown to select an AI tool
 */

import { forwardRef, SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { AI_TOOLS, getToolById } from "@/lib/constants";

export interface ToolSelectorProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  label?: string;
  error?: string;
  showIcon?: boolean;
  placeholder?: string;
}

export const ToolSelector = forwardRef<HTMLSelectElement, ToolSelectorProps>(
  ({ label, error, showIcon = true, placeholder = "Select a tool...", ...props }, ref) => {
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
            {AI_TOOLS.map((tool) => (
              <option key={tool.id} value={tool.id}>
                {tool.label}
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

ToolSelector.displayName = "ToolSelector";
