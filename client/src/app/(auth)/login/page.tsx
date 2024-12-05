import Image from 'next/image';
import { type ReactElement } from 'react';
import { LoginForm } from '@/components/auth/login-form';

export default function Login(): ReactElement {
  return (
    <section className="flex min-h-svh w-full flex-col md:flex-row-reverse">
      <div className="relative aspect-video w-full md:w-1/2 lg:w-[70%]">
        <Image
          src="/images/auth-image.jpg"
          alt="auth banner"
          fill
          className="object-cover"
        />
        <div className="absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-background md:bg-gradient-to-r" />
      </div>
      <div className="block w-full space-y-8 p-10 md:flex md:w-1/2 md:flex-col md:justify-center lg:w-[30%]">
        <h1 className="text-center text-3xl font-bold">
          Reconnect with the Stars!
        </h1>
        <LoginForm />
        <div>
          Don&apos;t have an account?&nbsp;
          <a href="/register" className="text-indigo-500">
            Register
          </a>
        </div>
      </div>
    </section>
  );
}
