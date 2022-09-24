import { Link } from "react-router-dom";
import style from "css/Navigation.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDove, faUserAlt } from "@fortawesome/free-solid-svg-icons";

export default function Navigation({ userObj }) {
  return (
    <nav className={style.navigation_container}>
      <ul>
        <li>
          <Link to="/">
            <FontAwesomeIcon icon={faDove} />
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <FontAwesomeIcon icon={faUserAlt} />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
