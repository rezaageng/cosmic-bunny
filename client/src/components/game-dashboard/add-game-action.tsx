import { useFormStatus } from 'react-dom';
import { useShallow } from 'zustand/shallow';
import { useEffect } from 'react';
import { Button } from '@/components/button';
import { useToastStore } from '@/store/toast';

export function AddGameAction(): JSX.Element {
  const { pending } = useFormStatus();

  const [setIsOpen, setMessage, setVariant] = useToastStore(
    useShallow((state) => [
      state.setIsOpen,
      state.setMessage,
      state.setVariant,
    ]),
  );

  useEffect(() => {
    if (pending) {
      setIsOpen(true);
      setMessage('Adding game...');
      setVariant('loading');
    } else {
      setIsOpen(false);
      setMessage('');
      setVariant('message');
    }
  }, [pending, setIsOpen, setMessage, setVariant]);

  return (
    <div className="flex justify-end">
      <Button type="submit" disabled={pending} className="mt-4 md:w-auto">
        Submit
      </Button>
    </div>
  );
}
