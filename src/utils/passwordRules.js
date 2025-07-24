// Example password rules for export and reference
export const passwordRules = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSymbol: true,
  notes: "Follow NIST/OWASP guidelines for strong passwords.",
};

export function exportPasswordRules() {
  return JSON.stringify(passwordRules, null, 2);
}
