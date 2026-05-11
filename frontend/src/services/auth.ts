export const redirectToIrisLogin = () => {
  window.location.href = `/api/auth/iris-login`;
};

export const redirectToIrisSignup = () => {
  window.location.href = `/api/auth/iris-signup`;
};

export const authenticate = async () => {
  const response = await fetch(`/api/auth/me`, {
    credentials: "include",
  });

  if (!response.ok) return false;

  return true;
};
