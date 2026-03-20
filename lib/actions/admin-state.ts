export type AdminActionState<FieldKey extends string = string> = {
  status: "idle" | "success" | "error";
  message: string | null;
  fieldErrors?: Partial<Record<FieldKey, string[]>>;
};

export const adminActionInitialState: AdminActionState = {
  status: "idle",
  message: null,
};
