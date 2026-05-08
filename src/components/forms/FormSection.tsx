/**
 * FormSection - Wrapper component for form sections
 */

import { ReactNode } from "react";

export interface FormSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  icon?: ReactNode;
}

export function FormSection({
  title,
  description,
  children,
  icon,
}: FormSectionProps) {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-start gap-3">
          {icon && <div className="mt-1 text-primary">{icon}</div>}
          <div>
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
