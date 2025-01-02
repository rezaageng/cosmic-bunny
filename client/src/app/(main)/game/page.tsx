import { redirect } from 'next/navigation';

export default function GamePage(): void {
  redirect('/dashboard');
}
