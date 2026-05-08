/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useActionState, useEffect } from "react";
import { Button } from "./ui/button";

import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { registerPatient } from "@/services/auth/registerPatient";
import { toast } from "sonner";

const RegisterForm = () => {
  const [state, formAction, isPending] = useActionState(registerPatient, null);
  const getFieldError = (fieldName: string) => {
    if (state && state.errors) {
      const error = state.errors.find((error: any) => error.path === fieldName);
      return error?.message;
    } else {
      return null;
    }
  };
  useEffect(() => {
    if (state && !state.success) {
      if (state.message) {
        toast.error(state.message);
      }
    }
  }, [state]);
  return (
    <>
      <form action={formAction}>
        <FieldGroup>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="name"> Full Name</FieldLabel>
              <Input id="name" name="name" type="text" placeholder="John doe" />
              {getFieldError("name") && (
                <FieldDescription className="text-red-500">
                  {getFieldError("name")}
                </FieldDescription>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="address">Address</FieldLabel>
              <Input
                id="address"
                name="address"
                type="text"
                placeholder="Address"
              />
              {getFieldError("address") && (
                <FieldDescription className="text-red-500">
                  {getFieldError("address")}
                </FieldDescription>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" name="email" type="email" placeholder="Email" />
              {getFieldError("email") && (
                <FieldDescription className="text-red-500">
                  {getFieldError("email")}
                </FieldDescription>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
              />
              {getFieldError("password") && (
                <FieldDescription className="text-red-500">
                  {getFieldError("password")}
                </FieldDescription>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="confirmPassword">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
              />
              {getFieldError("confirmPassword") && (
                <FieldDescription className="text-red-500">
                  {getFieldError("confirmPassword")}
                </FieldDescription>
              )}
            </Field>
          </div>
          <FieldGroup className="mt-4">
            <Field>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Creating Account..." : "Create Account"}
              </Button>
              <FieldDescription className="px-6 text-center">
                Already have an account? <a href="/login">Sign in</a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FieldGroup>
      </form>
    </>
  );
};

export default RegisterForm;
