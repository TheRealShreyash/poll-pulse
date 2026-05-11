import { BACKEND_URL } from '#/config'

export const redirectToIrisLogin = () => {
  window.location.href = `${BACKEND_URL}/api/auth/iris-login`
}

export const redirectToIrisSignup = () => {
  window.location.href = `${BACKEND_URL}/api/auth/iris-signup`
}

export const authenticate = async () => {
  const response = await fetch(`${BACKEND_URL}/api/auth/me`, {
    credentials: 'include',
  })

  if (!response.ok) return false
  console.log(response)

  console.log(await response.json())

  return true
}
