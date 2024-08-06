import { z } from "zod";

export const SignInSchema = z.object({
  gmail: z.string().min(1, "Email is required filed").email(),
  password: z.string().min(8),
  keep_signed_in: z.boolean().default(false),
});

export type SingInSchemaType = z.infer<typeof SignInSchema>;

export const SignUpSchema = z
  .object({
    gmail: z.string().min(1, "Email is required filed").email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
      });
    }
  });

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;

export const ResetPasswordSchema = z.object({
  gmail: z.string().min(1, "Email is required filed").email(),
});

export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;

export const ResetPasswordUpdateSchema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
      });
    }
  });

export type ResetPasswordUpdateSchemaType = z.infer<
  typeof ResetPasswordUpdateSchema
>;
