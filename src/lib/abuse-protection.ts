/**
 * Simple abuse protection and rate limiting
 * Prevents spam submissions and API abuse
 */

/**
 * In-memory rate limiting store
 * In production, use Redis or database
 */
const rateLimitStore = new Map<
  string,
  { count: number; resetTime: number }
>();

/**
 * Check if an email should be rate limited
 * Returns true if request should be allowed
 */
export function checkRateLimit(
  email: string,
  maxRequests: number = 5,
  windowSeconds: number = 3600
): boolean {
  const key = email.toLowerCase();
  const now = Date.now();

  const current = rateLimitStore.get(key);

  if (!current || now > current.resetTime) {
    // Create new rate limit window
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + windowSeconds * 1000,
    });
    return true;
  }

  if (current.count < maxRequests) {
    current.count++;
    return true;
  }

  return false;
}

/**
 * Clean up expired rate limit entries periodically
 * Call this in a background job
 */
export function cleanupExpiredLimits(): void {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

/**
 * Reset rate limit for an email (useful for manual testing)
 */
export function resetRateLimit(email: string): void {
  rateLimitStore.delete(email.toLowerCase());
}

/**
 * Validate email format and common spam indicators
 */
export function isValidLeadEmail(email: string): boolean {
  const normalizedEmail = email.toLowerCase().trim();

  // Basic email validation
  if (!normalizedEmail.includes("@") || !normalizedEmail.includes(".")) {
    return false;
  }

  // Block common spam domains
  const spamDomains = [
    "tempmail.com",
    "10minutemail.com",
    "guerrillamail.com",
    "mailinator.com",
    "throwaway.email",
  ];

  for (const domain of spamDomains) {
    if (normalizedEmail.endsWith(domain)) {
      return false;
    }
  }

  // Check for excessive dots or special characters
  if ((normalizedEmail.match(/\./g) || []).length > 3) {
    return false;
  }

  return true;
}

/**
 * Detect likely bot/spam submissions
 * Returns true if submission looks suspicious
 */
export function isSuspiciousSubmission(props: {
  email: string;
  companyName?: string;
  role?: string;
  honeypot?: string;
}): boolean {
  // Honeypot field should always be empty
  if (props.honeypot) {
    return true;
  }

  // Email validation
  if (!isValidLeadEmail(props.email)) {
    return true;
  }

  // Company name with excessive URLs or scripts
  if (props.companyName) {
    if (
      props.companyName.includes("http://") ||
      props.companyName.includes("https://") ||
      props.companyName.includes("<") ||
      props.companyName.includes(">")
    ) {
      return true;
    }
  }

  // Role with suspicious patterns
  if (props.role) {
    if (
      props.role.includes("http://") ||
      props.role.includes("https://") ||
      props.role.includes("<") ||
      props.role.includes(">")
    ) {
      return true;
    }
  }

  return false;
}
