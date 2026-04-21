export type UserRole = "user" | "admin";

export type ProfileRow = {
  id: string;
  email: string | null;
  role: UserRole | string;
  created_at: string;
};
