import RegisterFormPage from "./RegisterFormPage"

export default async function RegisterPage ({searchParams}) {
    const {redirect = '/'} = await searchParams
    return(
        <RegisterFormPage redirectTo={redirect}></RegisterFormPage>
    )
}