/**
 * Lead Capture Modal Dialog
 * Shows after audit results are displayed
 */

"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { LeadCaptureForm } from "./LeadCaptureForm";

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function LeadCaptureModal({
  isOpen,
  onClose,
  onSuccess,
}: LeadCaptureModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="relative w-full max-w-md rounded-lg border border-border bg-card shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-2 text-muted-foreground hover:bg-muted transition-colors"
          aria-label="Close dialog"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Content */}
        <div className="p-6 pt-12">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-foreground">
              Claim Your Optimization Plan
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Get your personalized recommendations and receive email updates about AI spending trends.
            </p>
          </div>

          {/* Form */}
          <LeadCaptureForm
            onSuccess={onSuccess}
          />

          {/* Footer */}
          <div className="mt-6 flex items-center justify-center gap-1">
            <button
              onClick={onClose}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Skip for now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
