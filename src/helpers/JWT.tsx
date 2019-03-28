export function getJwtHeader(JWT: any) {
  if (JWT) {
    let user: { token?: string } = JSON.parse(JWT)

    if (user.token) {
      return { Authorization: 'Bearer ' + user.token }
    }
  }

  return {}
}
