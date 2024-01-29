
export async function GET () {
  return Response.redirect(process.env.OAUTH_URL as string)
}
