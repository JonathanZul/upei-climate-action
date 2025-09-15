"use client";

import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';

type FormInputs = { email: string };

export default function NewsletterForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormInputs>();
  const [status, setStatus] = useState<'success' | 'error' | null>(null);
  const [message, setMessage] = useState('');

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setStatus(null);
    setMessage('');
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong.');
      }
      
      setStatus('success');
      setMessage('Success! You have been subscribed.');
      reset();
    } catch (error: any) {
      setStatus('error');
      setMessage(error.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex items-start gap-2">
        <div className="flex-grow">
          <input
            type="email"
            placeholder="janedoe@upei.ca"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' },
            })}
            className="w-full rounded-md border-tertiary border px-3 py-1.5 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-primary px-4 py-1.5 text-sm text-white-text transition-transform hover:scale-105 disabled:bg-gray-400"
        >
          {isSubmitting ? 'Joining...' : 'Join'}
        </button>
      </div>
      {status === 'success' && <p className="text-sm text-green-600">{message}</p>}
      {status === 'error' && <p className="text-sm text-red-600">{message}</p>}
      <p className="text-xs text-gray-500">No spam, we also hate it.</p>
    </form>
  );
}