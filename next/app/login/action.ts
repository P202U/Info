'use server';

import { createSession, deleteSession } from '@/lib/session';
import { loginSchema } from '@/lib/zodSchema';
import * as z from 'zod';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import argon2 from 'argon2';

export async function login(prevState: unknown, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return { error: z.flattenError(result.error) };
  }

  const { email, password } = result.data;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return { error: 'Invalid email or password.' };
  }

  const passwordIsValid = await argon2.verify(user.password, password);

  if (!passwordIsValid) {
    return { error: 'Invalid email or password.' };
  }

  try {
    await createSession(user.id);

    redirect('/dashboard');
  } catch (error) {
    return {
      error: `An error occurred while creating the session. Please try again. ${error}`,
    };
  }
}

export async function logout() {
  await deleteSession();
  redirect('/login');
}
