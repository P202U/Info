'use client';

import { useFormStatus } from 'react-dom';
import { useActionState } from 'react';
import { handleUpload } from './actions';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600 transition disabled:bg-gray-400"
      aria-disabled={pending}
      disabled={pending}
    >
      {pending ? 'Uploading...' : 'Submit'}
    </button>
  );
}

export default function Home() {
  const initialState = { message: '' };
  const [formState, formAction] = useActionState(handleUpload, initialState);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold pb-24">CSV Uploader</h1>
      <form action={formAction} className="space-y-6 w-96">
        <div>
          <label htmlFor="csv" className="block text-lg font-medium mb-2">
            Select CSV file:
          </label>
          <input
            type="file"
            name="csv"
            accept=".csv"
            required
            className="w-full p-4 border rounded border-gray-300"
          />
        </div>

        <SubmitButton />
        {formState.message && (
          <p
            className={`text-center font-semibold ${
              formState.message.includes('Error')
                ? 'text-red-500'
                : 'text-green-500'
            }`}
          >
            {formState.message}
          </p>
        )}
      </form>
    </main>
  );
}
