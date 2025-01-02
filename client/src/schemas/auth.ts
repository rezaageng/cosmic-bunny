import { z } from 'zod';

const oneNumberRegex = /.*[0-9].*/;
const oneLowerCaseRegex = /.*[a-z].*/;
const oneUpperCaseRegex = /.*[A-Z].*/;
const oneSpecialCharRegex = /.*[!@#$%^&*].*/;

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: 'Name must contain at least 8 character(s)' }),
    email: z.string().email(),
    role: z.enum(['user', 'admin']),
    password: z
      .string()
      .min(8, { message: 'Password must contain at least 8 character(s)' })
      .regex(oneNumberRegex, 'Password must contain at least one number')
      .regex(
        oneLowerCaseRegex,
        'Password must contain at least one lowercase letter',
      )
      .regex(
        oneUpperCaseRegex,
        'Password must contain at least one uppercase letter',
      )
      .regex(
        oneSpecialCharRegex,
        'Password must contain at least one special character',
      ),
    password_confirmation: z
      .string()
      .min(8, { message: 'Password must contain at least 8 character(s)' })
      .regex(oneNumberRegex, 'Password must contain at least one number')
      .regex(
        oneLowerCaseRegex,
        'Password must contain at least one lowercase letter',
      )
      .regex(
        oneUpperCaseRegex,
        'Password must contain at least one uppercase letter',
      )
      .regex(
        oneSpecialCharRegex,
        'Password must contain at least one special character',
      ),
    terms: z.boolean(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords do not match',
    path: ['password_confirmation'],
  });

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export const RegisterResponseSchema = z.object({
  message: z.string(),
  data: z
    .object({
      user: z.object({
        id: z.number(),
        name: z.string(),
        email: z.string(),
        role: z.string(),
        updated_at: z.string(),
        created_at: z.string(),
      }),
      token: z.string(),
    })
    .optional(),
  errors: z
    .object({
      name: z.array(z.string()).optional(),
      email: z.array(z.string()).optional(),
      role: z.array(z.string()).optional(),
      password: z.array(z.string()).optional(),
      password_confirmation: z.array(z.string()).optional(),
      terms: z.array(z.string()).optional(),
    })
    .optional(),
});

export type RegisterResponse = z.infer<typeof RegisterResponseSchema>;

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must contain at least 8 character(s)' })
    .regex(oneNumberRegex, 'Password must contain at least one number')
    .regex(
      oneLowerCaseRegex,
      'Password must contain at least one lowercase letter',
    )
    .regex(
      oneUpperCaseRegex,
      'Password must contain at least one uppercase letter',
    )
    .regex(
      oneSpecialCharRegex,
      'Password must contain at least one special character',
    ),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const LoginResponseSchema = z.object({
  message: z.string(),
  data: z
    .object({
      user: z.object({
        id: z.number(),
        name: z.string(),
        email: z.string(),
        role: z.string(),
        updated_at: z.string(),
        created_at: z.string(),
      }),
      token: z.string(),
    })
    .optional(),
  errors: z
    .object({
      email: z.array(z.string()).optional(),
      password: z.array(z.string()).optional(),
    })
    .optional(),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export const UserResponseSchema = z.object({
  message: z.string(),
  data: z
    .object({
      id: z.number(),
      name: z.string(),
      email: z.string().email(),
      role: z.string(),
      updated_at: z.string(),
      created_at: z.string(),
    })
    .optional(),
});

export type UserResponse = z.infer<typeof UserResponseSchema>;
