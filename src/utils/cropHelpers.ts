export const cropped = (iterable: any, maxLength: number) => {
  if (iterable.length > maxLength) iterable = iterable.slice(0, maxLength);
  return iterable;
};
