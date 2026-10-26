/**
 * Validates domain clearance rules for HB+
 */
const DEFAULT_ALLOWED_DOMAIN = process.env.EXPO_PUBLIC_ALLOWED_DOMAIN || 'hbplus.fit';

export function isAllowedStaffDomain(email: string, allowedDomain = DEFAULT_ALLOWED_DOMAIN): boolean {
  if (!email || !email.includes('@')) return false;
  const domain = email.split('@').pop()?.toLowerCase();
  return domain === allowedDomain.toLowerCase();
}
