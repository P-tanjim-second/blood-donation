import LoginPageForm from "./LoginPageForm";

export default async function LoginPage ({searchParams}) {
    const {redirect = '/'} = await searchParams
    return(
        <LoginPageForm redirectTo={redirect}></LoginPageForm>
    )
}