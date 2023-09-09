const api = require('./data.json')

export function loginService(data: { email: string; password: string }) {
  const { email, password } = data
  return api.user.filter(
    (f) =>
      f.email.toLocaleLowerCase() === email.toLocaleLowerCase() &&
      f.password.toLocaleLowerCase() === password.toLocaleLowerCase()
  )[0]
}
