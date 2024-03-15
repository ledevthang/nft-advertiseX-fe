export const checkIphone = () => {
  const u = navigator.userAgent;
  return !!u.match(/iPhone/i);
};
