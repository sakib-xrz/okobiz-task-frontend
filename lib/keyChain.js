import Link from "next/link";
import { IdCard, LogOut, UsersRound } from "lucide-react";

export const AUTH_TOKEN_KEY = "@AUTH_TOKEN";

export const NAV_OPTIONS = [
  {
    label: (
      <Link href="/nid" className="flex items-center gap-2">
        <IdCard className="size-5" /> Nid
      </Link>
    ),
    key: "0",
    role: ["USER", "ADMIN"],
  },
  {
    label: (
      <Link href="/users" className="flex items-center gap-2">
        <UsersRound className="size-5" /> Users
      </Link>
    ),
    key: "1",
    role: ["ADMIN"],
  },
  {
    type: "divider",
  },
  {
    label: (
      <Link href="/logout" className="flex items-center gap-2">
        <LogOut className="size-5" /> Logout
      </Link>
    ),
    danger: true,
    key: "2",
    role: ["USER", "ADMIN"],
  },
];

export const bloodGroups = [
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" },
];
