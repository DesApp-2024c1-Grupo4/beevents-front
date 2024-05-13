
function LoginForm() {
  return <>
  </>
}

function CreateAccountForm() {
  return <>
  </>
}

function RecoverPasswordForm() {
  return <>
  </>
}

function AccountCreatedSuccessfully() {
  return <>
  </>
}

export function LoginPage() {
  return <>
    userHasAnAccount && <LoginForm></LoginForm>
    !userHasAnAccount && <CreateAccountForm></CreateAccountForm>
    needToRecoverPassword && <RecoverPasswordForm></RecoverPasswordForm>
    userCreatedAccount && <AccountCreatedSuccessfully></AccountCreatedSuccessfully>
  </>
}