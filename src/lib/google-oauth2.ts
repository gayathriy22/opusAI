type TokenGrantError = { error: { code: number, message: string, status: string } };
type TokenGrantResponse = {
  access_token: string,
  expires_in: number,
  id_token: string,
  refresh_token: string,
  scope: string,
  token_type: 'Bearer',
  error: undefined
};

export async function getTokens (oauthCode: string) {
  const url = 'https://oauth2.googleapis.com/token'
  const data = {
    code: oauthCode,
    grant_type: 'authorization_code',
    client_id: process.env.OAUTH_CLIENT_ID,
    client_secret: process.env.OAUTH_CLIENT_SECRET,
    redirect_uri: process.env.OAUTH_REDIRECT_URL
  }

  const response: TokenGrantResponse | TokenGrantError = await fetch(url, { method: 'POST', body: JSON.stringify(data) })
    .then(x => x.json()).catch(e => console.log(e.response.data.error))
  return response
}

type RefreshTokenResponse = {
  access_token: string,
  scope: string, 
  expires_in: number, 
  token_type: 'Bearer', 
  id_token: string
}


export async function getAccessToken (refreshToken: string) {
  // // Access token is not expired yet
  // if (new Date(_.access_expire) > Date.now()) return cryptr.decrypt(_.access_token)

  const url = 'https://oauth2.googleapis.com/token'
  const data = {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    grant_type: 'refresh_token',
    refresh_token: refreshToken
  }

  const response: RefreshTokenResponse = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data)
  }).then(x => x.json()).catch(() => {})

  if (!response.access_token) return

  // if (token) {
  //   const offset = response.expires_in - 30
  //   _.access_expire = moment().add(offset, 'seconds').toISOString()
  // }
  // return token
}

export type UserInfoResponse = {
  family_name: string, 
  name: string, 
  picture: string,
  locale: string, 
  email: string,
  given_name: string,
  id: string,
  hd: string, // "uci.edu"
  verified_email: boolean
}

export async function getUserInfo (accessToken: string): Promise<UserInfoResponse> {
  const url = 'https://www.googleapis.com/oauth2/v2/userinfo'
  const headers = { Authorization: 'Bearer ' + accessToken }
  const response = await fetch(url, { headers }).then(x => x.json())
  return response
}
