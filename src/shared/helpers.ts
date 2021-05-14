export function getInitials(firstName: string, lastName: string) {
  return firstName.substring(0, 1) + (lastName || "").substring(0, 1);
}
