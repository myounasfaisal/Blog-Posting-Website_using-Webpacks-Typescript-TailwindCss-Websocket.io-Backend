// utils/idFromLocalStorage.ts
export const idFromLocalStorage = (): string | null => {
  return localStorage.getItem("_id");
};
