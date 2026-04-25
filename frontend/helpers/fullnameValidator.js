export function fullnameValidator(fullName) {
  // Handle null, undefined, or empty
  if (!fullName) return "Full name is required."
  
  const trimmed = fullName.trim();
  
  if (trimmed.length === 0) return "Full name is required."
  if (trimmed.length < 3) return "Full name must be at least 3 characters."
  if (trimmed.length > 50) return "Full name is too long."
  
  // Allow letters, spaces, hyphens, apostrophes, and periods
  const nameRegex = /^[a-zA-Z\s\-'\.]+$/;
  if (!nameRegex.test(trimmed)) {
    return "Full name can only contain letters, spaces, hyphens, apostrophes, and periods."
  }
  
  return ''
}