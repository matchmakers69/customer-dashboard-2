export default (str, max = 80) => {
  const string = str.trim();
  const ellipsis = string.length > max ? '...' : '';

  return `${string.substring(0, max)}${ellipsis}`;
};
