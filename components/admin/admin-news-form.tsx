"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { createNewsPostAction } from "@/lib/actions/admin";
import { adminActionInitialState } from "@/lib/actions/admin-state";
import { Alert } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AdminField } from "@/components/admin/admin-field";
import { AdminSubmitButton } from "@/components/admin/admin-submit-button";

type CategoryOption = {
  id: string;
  name_ka: string;
};

export function AdminNewsForm({
  categories,
}: {
  categories: CategoryOption[];
}) {
  const [state, formAction] = useActionState(
    createNewsPostAction,
    adminActionInitialState,
  );
  const formRef = useRef<HTMLFormElement>(null);
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
      formRef.current?.reset();
      return;
    }

    toast.error(state.message);
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="grid gap-6">
      {state.status !== "idle" && state.message ? (
        <Alert
          title={state.status === "success" ? "მზად არის" : "შეცდომა"}
          description={state.message}
          tone={state.status === "success" ? "primary" : "danger"}
        />
      ) : null}

      <div className="grid gap-5 xl:grid-cols-2">
        <AdminField
          label="კატეგორია"
          description="სტატია სურვილისამებრ მიაბით არსებულ კატეგორიას."
          error={state.fieldErrors?.category_id?.[0]}
          htmlFor="category_id"
        >
          <Select id="category_id" name="category_id" defaultValue="">
            <option value="">კატეგორიის გარეშე</option>
            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name_ka}
              </option>
            ))}
          </Select>
        </AdminField>

        <AdminField
          label="თეგები"
          description="გამოყავით მძიმეებით: მაგალითად, კარდიოლოგია, ონლაინ."
          error={state.fieldErrors?.tags?.[0]}
          htmlFor="tags"
        >
          <Input id="tags" name="tags" placeholder="კარდიოლოგია, ონლაინ, რჩევები" />
        </AdminField>
      </div>

      <div className="grid gap-5">
        <AdminField
          label="სათაური"
          description="გამოიყენეთ მკაფიო და მარტივად წასაკითხი სათაური."
          error={state.fieldErrors?.title_ka?.[0]}
          htmlFor="title_ka"
        >
          <Input id="title_ka" name="title_ka" placeholder="მაგ: სახლში კარდიოლოგიური ვიზიტი უკვე ECG მხარდაჭერით" />
        </AdminField>

        <AdminField
          label="მოკლე აღწერა"
          description="ეს ტექსტი გამოჩნდება სიახლეების სიაში და preview ბლოკებში."
          error={state.fieldErrors?.excerpt_ka?.[0]}
          htmlFor="excerpt_ka"
        >
          <Input
            id="excerpt_ka"
            name="excerpt_ka"
            placeholder="სტატიის მოკლე აღწერა 1-2 წინადადებაში"
          />
        </AdminField>

        <AdminField
          label="Markdown შინაარსი"
          description="გამოიყენეთ სათაურები, სიები და მნიშვნელოვანი ტექსტის გამოყოფა."
          error={state.fieldErrors?.content_markdown?.[0]}
          htmlFor="content_markdown"
        >
          <Textarea
            id="content_markdown"
            name="content_markdown"
            placeholder="## სტატიის შინაარსი"
            className="min-h-[24rem] resize-y"
          />
        </AdminField>
      </div>

      <label className="flex min-w-0 items-start gap-3 rounded-[1.6rem] border border-border bg-surface-muted/70 p-4 text-sm leading-6 text-muted">
        <input
          type="checkbox"
          name="is_published"
          className="mt-1 h-4 w-4 rounded border-border"
        />
        <span className="break-words">
          გამოაქვეყნე სტატია ახლავე. თუ ველი ცარიელია, სტატია დარჩება draft რეჟიმში.
        </span>
      </label>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-5">
        <p className="text-sm leading-6 text-muted">
          შენახვის შემდეგ გვერდი ავტომატურად განახლდება და სტატია სიაში გამოჩნდება.
        </p>
        <AdminSubmitButton pendingLabel="ინახება..." className="min-w-[11rem]">
          სტატიის დამატება
        </AdminSubmitButton>
      </div>
    </form>
  );
}
