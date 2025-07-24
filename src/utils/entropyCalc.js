// Calculates the entropy of a password
export function calculateEntropy(password) {
  let poolSize = 0;
  if (/[a-z]/.test(password)) poolSize += 26;
  if (/[A-Z]/.test(password)) poolSize += 26;
  if (/[0-9]/.test(password)) poolSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) poolSize += 32;
  const length = password.length;
  if (!length || !poolSize) return 0;
  const entropy = length * Math.log2(poolSize);
  return entropy;
}
