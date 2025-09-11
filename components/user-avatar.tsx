"use client";

import { LogOut, User } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { logout } from "@/app/login/actions";

interface UserAvatarProps {
  className?: string;
  name?: string;
}

export function UserAvatar({ className = "", name }: UserAvatarProps) {
  if (!name) {
    return (
      <Link href="/login">
        <div
          className={`w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors flex items-center justify-center cursor-pointer ${className}`}
        >
          <span className="text-sm font-medium text-gray-600">
            <User className="w-4 h-4" />
          </span>
        </div>
      </Link>
    );
  }

  const initial = name.charAt(0).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={`w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center cursor-pointer ${className}`}
        >
          <span className="text-sm font-medium text-white">{initial}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex items-center w-full">
            <span>Profilo</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={logout}
          className="flex items-center text-red-600"
        >
          <LogOut className="w-4 h-4 mr-2" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
