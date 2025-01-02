'use client';

import { type ReactElement } from 'react';
import { useFormState } from 'react-dom';
import { SubmitButton } from '@/components/auth/submit-button';
import { ErrorMessage, InputGroup, Label, TextInput } from '@/components/form';
import { login } from '@/lib/actions';
import { type LoginResponse } from '@/schemas/auth';

const initialState: LoginResponse = {
  message: '',
};
export function LoginForm(): ReactElement {
  const [state, formAction] = useFormState(login, initialState);

  return (
    <form action={formAction}>
      <div className="space-y-2">
        <InputGroup>
          <Label htmlFor="email">Email</Label>
          <TextInput id="email" type="email" name="email" />
          <ErrorMessage>{state.errors?.email?.[0]}</ErrorMessage>
        </InputGroup>
        <InputGroup>
          <Label htmlFor="password">Password</Label>
          <TextInput id="password" type="password" name="password" />
          <ErrorMessage>{state.errors?.password?.[0]}</ErrorMessage>
        </InputGroup>
      </div>
      <SubmitButton className="mt-6">Login</SubmitButton>
    </form>
  );
}
