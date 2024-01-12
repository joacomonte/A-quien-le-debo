export function validateMemberName(memberName: string) {
  if (!memberName) {
    return "Missing memberName";
  }

  if (memberName.length < 3) {
    return "Member name must be at least 3 characters long";
  }

  if (memberName.length > 20) {
    return "Member name must be at most 20 characters long";
  }

  if (!memberName.match(/^[a-zA-Z0-9 ]+$/)) {
    return "Member name must contain only letters, numbers, and spaces";
  }

  if (memberName.trim() === "") {
    return "Member name must not be empty";
  }

  return null; // Indicates a valid request
}

export function notEmptyInput(value: any) {
  return !value || value === "";
}
