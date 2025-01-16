import { auth, signOut, signIn } from "@/auth"

const SignInPage = async () => {
  const session = await auth()
  console.log(session)
  const user = session?.user

  if (user) {
    return (
      <form
        action={async () => {
          "use server"
          await signOut()
        }}
      >
        <p>Sign in as {user.name}</p>
        <button type="submit">Signout</button>
      </form>
    )
  }

  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
  )

}

export default SignInPage