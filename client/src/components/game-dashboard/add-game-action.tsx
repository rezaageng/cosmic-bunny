import { useFormStatus } from 'react-dom';
import { Button } from '@/components/button';

export function AddGameAction(): JSX.Element {
  const { pending } = useFormStatus();

  return (
    <div className="flex justify-end">
      <Button type="submit" disabled={pending} className="mt-4 md:w-auto">
        Submit
      </Button>
    </div>
  );
}
