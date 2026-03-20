"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import {
  updateAdminPasswordAction,
  updateAdminProfileAction,
} from "@/lib/actions/admin";
import { adminActionInitialState } from "@/lib/actions/admin-state";
import { AdminField } from "@/components/admin/admin-field";
import { AdminSubmitButton } from "@/components/admin/admin-submit-button";
import { Alert } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

function useAdminActionToast(state: {
  status: "idle" | "success" | "error";
  message: string | null;
}) {
  const lastToastKeyRef = useRef("");

  useEffect(() => {
    if (state.status === "idle" || !state.message) {
      return;
    }

    const nextKey = `${state.status}:${state.message}`;

    if (nextKey === lastToastKeyRef.current) {
      return;
    }

    lastToastKeyRef.current = nextKey;

    if (state.status === "success") {
      toast.success(state.message);
      return;
    }

    toast.error(state.message);
  }, [state]);
}

export function AdminSettingsForms({
  email,
  displayName,
}: {
  email: string;
  displayName: string;
}) {
  const [profileState, profileAction] = useActionState(
    updateAdminProfileAction,
    adminActionInitialState,
  );
  const [passwordState, passwordAction] = useActionState(
    updateAdminPasswordAction,
    adminActionInitialState,
  );
  const passwordFormRef = useRef<HTMLFormElement>(null);

  useAdminActionToast(profileState);
  useAdminActionToast(passwordState);

  useEffect(() => {
    if (passwordState.status === "success") {
      passwordFormRef.current?.reset();
    }
  }, [passwordState.status]);

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <Card className="p-6 sm:p-7">
        <CardHeader className="space-y-3">
          <CardTitle>Account Info</CardTitle>
          <p className="text-sm leading-6 text-muted">
            აქედან შეგიძლიათ ნახოთ ანგარიშის ელფოსტა და განაახლოთ ადმინისტრატორის
            საჯარო სახელი.
          </p>
        </CardHeader>
        <CardContent className="space-y-5 border-t border-border/70 pt-5">
          {profileState.status !== "idle" && profileState.message ? (
            <Alert
              title={profileState.status === "success" ? "განახლდა" : "პრობლემა"}
              description={profileState.message}
              tone={profileState.status === "success" ? "primary" : "danger"}
            />
          ) : null}

          <form action={profileAction} className="space-y-5">
            <AdminField
              label="ელფოსტა"
              description="სისტემაში ავტორიზაციისთვის გამოყენებული ელფოსტა."
              htmlFor="admin_email"
            >
              <Input id="admin_email" value={email} readOnly disabled />
            </AdminField>

            <AdminField
              label="Display name"
              description="ეს სახელი გამოჩნდება dashboard-ის ზედა ნაწილსა და პროფილის ბლოკებში."
              error={profileState.fieldErrors?.display_name?.[0]}
              htmlFor="display_name"
            >
              <Input
                id="display_name"
                name="display_name"
                defaultValue={displayName}
                placeholder="მაგ: Project Admin"
              />
            </AdminField>

            <div className="flex justify-end pt-2">
              <AdminSubmitButton pendingLabel="ინახება...">
                ინფორმაციის შენახვა
              </AdminSubmitButton>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="p-6 sm:p-7">
        <CardHeader className="space-y-3">
          <CardTitle>Change Password</CardTitle>
          <p className="text-sm leading-6 text-muted">
            უსაფრთხოებისთვის შეიყვანეთ მიმდინარე პაროლი, შემდეგ კი ახალი პაროლი მინიმუმ
            8 სიმბოლოთი.
          </p>
        </CardHeader>
        <CardContent className="space-y-5 border-t border-border/70 pt-5">
          {passwordState.status !== "idle" && passwordState.message ? (
            <Alert
              title={passwordState.status === "success" ? "პაროლი განახლდა" : "პრობლემა"}
              description={passwordState.message}
              tone={passwordState.status === "success" ? "primary" : "danger"}
            />
          ) : null}

          <form ref={passwordFormRef} action={passwordAction} className="space-y-5">
            <AdminField
              label="მიმდინარე პაროლი"
              error={passwordState.fieldErrors?.current_password?.[0]}
              htmlFor="current_password"
            >
              <Input
                id="current_password"
                name="current_password"
                type="password"
                autoComplete="current-password"
                placeholder="შეიყვანეთ მიმდინარე პაროლი"
              />
            </AdminField>

            <AdminField
              label="ახალი პაროლი"
              description="გამოიყენეთ მინიმუმ 8 სიმბოლო და განსხვავებული პაროლი."
              error={passwordState.fieldErrors?.new_password?.[0]}
              htmlFor="new_password"
            >
              <Input
                id="new_password"
                name="new_password"
                type="password"
                autoComplete="new-password"
                placeholder="ახალი პაროლი"
              />
            </AdminField>

            <AdminField
              label="დაადასტურეთ ახალი პაროლი"
              error={passwordState.fieldErrors?.confirm_password?.[0]}
              htmlFor="confirm_password"
            >
              <Input
                id="confirm_password"
                name="confirm_password"
                type="password"
                autoComplete="new-password"
                placeholder="გაიმეორეთ ახალი პაროლი"
              />
            </AdminField>

            <div className="flex justify-end pt-2">
              <AdminSubmitButton pendingLabel="ახლდება...">
                პაროლის განახლება
              </AdminSubmitButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
