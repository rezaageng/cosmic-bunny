'use client';

import type { ReactElement } from 'react';
import {
  CheckBox,
  ErrorMessage,
  InputGroup,
  Label,
  TextInput,
} from '@/components/form';
import { register } from '@/lib/actions';
import type { RegisterResponse } from '@/schemas/auth';
import { useFormState } from 'react-dom';
import { SubmitButton } from '@/components/auth/submit-button';

const initialState: RegisterResponse = {
  message: '',
};

export function RegisterForm(): ReactElement {
  const [state, formAction] = useFormState(register, initialState);

  return (
    <form action={formAction} className="space-y-2">
      <InputGroup>
        <Label htmlFor="name">Name</Label>
        <TextInput id="name" type="text" name="name" />
        <ErrorMessage>{state.errors?.name?.[0]}</ErrorMessage>
      </InputGroup>
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
      <InputGroup>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <TextInput
          id="confirmPassword"
          type="password"
          name="password_confirmation"
        />
        <ErrorMessage>{state.errors?.password_confirmation?.[0]}</ErrorMessage>
      </InputGroup>
      <div>
        <div className="space-x-4">
          <CheckBox id="terms" name="terms" />
          <Label htmlFor="terms">I agree to the terms and conditions</Label>
        </div>
        <ErrorMessage>{state.errors?.terms?.[0]}</ErrorMessage>
      </div>
      <SubmitButton>Register</SubmitButton>
    </form>
  );
}
