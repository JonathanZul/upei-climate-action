"use client";

import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { FaInstagram, FaDiscord } from 'react-icons/fa';

// Define the shape of our form data
type FormInputs = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormInputs>();
  const [submissionStatus, setSubmissionStatus] = useState<'success' | 'error' | null>(null);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setSubmissionStatus(null);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmissionStatus('success');
      reset(); // Clear the form on successful submission
    } catch (error) {
      console.error(error);
      setSubmissionStatus('error');
    }
  };

  return (
    <div className="mx-auto mt-12 w-full max-w-4xl rounded-2xl bg-white-text/95 p-8 text-left text-tertiary shadow-2xl backdrop-blur-sm sm:p-12">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {/* Left Column: Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6">
          <div>
            <label htmlFor="name" className="font-poppins text-sm">Full Name</label>
            <input
              id="name"
              type="text"
              {...register('name', { required: 'Full name is required' })}
              className="mt-2 w-full border-b-2 border-tertiary bg-transparent pb-2 focus:border-primary focus:outline-none"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className="font-poppins text-sm">E-mail</label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Entered value does not match email format',
                },
              })}
              className="mt-2 w-full border-b-2 border-tertiary bg-transparent pb-2 focus:border-primary focus:outline-none"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="message" className="font-poppins text-sm">Message</label>
            <textarea
              id="message"
              rows={3}
              {...register('message', { required: 'Message is required' })}
              className="mt-2 w-full border-b-2 border-tertiary bg-transparent pb-2 focus:border-primary focus:outline-none"
            />
            {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-primary px-6 py-3 font-nunito text-base text-white-text shadow-md transition-transform duration-200 hover:scale-105 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
          
          {submissionStatus === 'success' && <p className="text-green-600">Message sent successfully!</p>}
          {submissionStatus === 'error' && <p className="text-red-600">Something went wrong. Please try again.</p>}
        </form>

        {/* Right Column: Contact Info */}
        <div className="flex flex-col justify-center space-y-6">
          <div>
            <h3 className="font-poppins text-2xl font-bold">Contact</h3>
            <a href="mailto:caas@upeisu.ca" className="mt-2 inline-block text-lg text-primary hover:underline">
              caas@upeisu.ca
            </a>
          </div>
          <div className="space-y-4">
            <a href="#" className="flex w-full items-center justify-center gap-3 rounded-full bg-accent-bg px-4 py-3 font-poppins text-sm font-semibold text-tertiary transition-transform hover:scale-105">
              <FaInstagram />
              <span>Follow Us on Instagram</span>
            </a>
            <a href="#" className="flex w-full items-center justify-center gap-3 rounded-full bg-accent-bg px-4 py-3 font-poppins text-sm font-semibold text-tertiary transition-transform hover:scale-105">
              <FaDiscord />
              <span>Join Our Discord Server</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}