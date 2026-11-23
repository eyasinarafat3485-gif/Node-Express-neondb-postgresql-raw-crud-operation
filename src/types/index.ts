export type Role = "admin" | "manager" | "user";

export const USER_ROLE = {
    admin: "admin",
    manager: "manager",
    user: "user"
} as const;