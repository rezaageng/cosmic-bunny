import { redirect } from 'next/navigation';

export default function Dashboard(): void {
  redirect('/dashboard/games');
}
