'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { login } from './action';

export function LoginForm() {
  const [state, loginAction] = useActionState(login, undefined);

  return (
    <form action={loginAction} className="flex max-w-[300px] flex-col gap-2">
      <div className="flex flex-col gap-2">
        <input id="email" name="email" placeholder="Email" />
      </div>
      {state?.error &&
        typeof state.error !== 'string' &&
        state.error.fieldErrors.email && (
          <p className="text-red-500">{state.error.fieldErrors.email}</p>
        )}

      <div className="flex flex-col gap-2">
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
        />
      </div>
      {state?.error &&
        typeof state.error !== 'string' &&
        state.error.fieldErrors.password && (
          <p className="text-red-500">{state.error.fieldErrors.password}</p>
        )}
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit">
      Login
    </button>
  );
}
