import AuthForm from "components/AuthForm";
import { authService, firebaseInstance } from "myBase";
import style from "css/Auth.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";

export default function Auth() {
  const onSocialClick = async (e) => {
    const {
      target: { name },
    } = e;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };
  return (
    <div>
      <AuthForm style={style} />
      <div className={style.auth_btn_container}>
        <button onClick={onSocialClick} name="google">
          <span>
            <FontAwesomeIcon icon={faGoogle} />
          </span>
          Continue with Google
        </button>
        <button onClick={onSocialClick} name="github">
          <span>
            <FontAwesomeIcon icon={faGithub} />
          </span>
          Continue with Github
        </button>
      </div>
    </div>
  );
}
