"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginWithEmail, type LoginEmailState } from "./actions";

const initialState: LoginEmailState = { error: null };

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    loginWithEmail,
    initialState
  );

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="nome@esempio.it"
          autoComplete="email"
          required
          disabled={isPending}
          aria-invalid={!!state?.error}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          required
          disabled={isPending}
          aria-invalid={!!state?.error}
        />
      </div>
      {state?.error && (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      )}
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Accesso in corso..." : "Accedi con email"}
      </Button>
    </form>
  );
}
