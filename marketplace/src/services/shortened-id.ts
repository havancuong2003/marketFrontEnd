export const ShortId = (id: string): string => {
  if (id) {
    const shortenedId =
      id.substring(0, 5) + "..." + id.substring(id.length - 6);
    return shortenedId;
  } else {
    return "";
  }
};
