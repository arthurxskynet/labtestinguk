import type { UserRole } from "@/types/profile";

export function isAdminRole(role: string | null | undefined): boolean {
  return role === "admin";
}

export function parseUserRole(value: string | null | undefined): UserRole {
  return value === "admin" ? "admin" : "user";
}
