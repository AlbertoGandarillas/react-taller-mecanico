import { Fragment } from "react";
import { Register, AuthLogin } from "../modules/auth/";
import '../../src/styles.scss'
export function Login() {
  return (
    <Fragment>
      <div className="auth">
        <div className="auth__login">
          <h2>Login</h2>
          <AuthLogin />
        </div>
        <div className="auth__signup">
          <h2>Registrese</h2>
          <Register />
        </div>
      </div>
    </Fragment>
  );
}
