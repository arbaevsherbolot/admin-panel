import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";
import styles from "./Header.module.scss";

export const Header = () => {
  const auth = useAuthUser();

  return (
    <>
      <div className={styles.navbar}>
        <Link to="/">
          <div className={styles.logo}>
            <img
              src="https://devxschool.com/wp-content/uploads/2021/12/DevX_logo-white.png"
              alt="`logo"
            />
          </div>
        </Link>
      </div>
    </>
  );
};
