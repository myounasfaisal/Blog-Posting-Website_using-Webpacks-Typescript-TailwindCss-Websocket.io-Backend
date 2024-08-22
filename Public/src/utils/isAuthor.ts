export const isAuthor = (
  checkId: string | number | null | undefined,
  authorId: string | number | null | undefined
): boolean => {
  if (checkId == authorId) return true;
  else return false;
};
