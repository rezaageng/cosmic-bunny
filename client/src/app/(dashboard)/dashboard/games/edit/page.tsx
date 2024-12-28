import { redirect } from 'next/navigation';

export default function EditRoot(): void {
  redirect('/dashboard/games');
}
