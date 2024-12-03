import Image from 'next/image';
import { RegisterForm } from '@/components/auth/register-form';

export default function Register(): JSX.Element {
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
        <h1 className="text-center text-3xl font-bold">Hop Into Cosmos!</h1>
        <RegisterForm />
        <div>
          Already have an account?&nbsp;
          <a href="/login" className="text-indigo-500">
            Login
          </a>
        </div>
      </div>
    </section>
  );
}
