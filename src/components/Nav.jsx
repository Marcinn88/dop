import styles from "./Nav.module.css";
import { Link } from "react-router-dom";
import menuIco from "../images/menu.svg";
import { useState } from "react";

export const Nav = ({ selected, token }) => {
  const [menu, setMenu] = useState(false);
  const toggleMenu = () => {
    setMenu(!menu);
    console.log("changed modal");
  };

  return (
    <>
      <div
        onClick={() => {
          toggleMenu();
        }}
        className={
          menu ? styles.mobileMenuShadowBox : styles.mobileMenuShadowBoxOff
        }
      ></div>
      <div className={styles.mainNav}>
        <div
          className={
            menu
              ? styles.mainNavWrapperMenuMobile
              : styles.mainNavWrapperMenuMobileOff
          }
        >
          <ul className={styles.mainNavListMobile}>
            <li className={styles.mainNavEl}>
              <Link to="/dop/">
                {selected === "news" ? (
                  <p className={styles.mainNavElTextSelected}>News</p>
                ) : (
                  <p className={styles.mainNavElText}>News</p>
                )}
              </Link>
            </li>
            <li className={styles.mainNavEl}>
              <Link to="/dop/about">
                {selected === "about" ? (
                  <p className={styles.mainNavElTextSelected}>O mnie</p>
                ) : (
                  <p className={styles.mainNavElText}>O mnie</p>
                )}
              </Link>
            </li>
            <li className={styles.mainNavEl}>
              <Link to="/dop/gallery">
                {selected === "gallery" ? (
                  <p className={styles.mainNavElTextSelected}>Galeria</p>
                ) : (
                  <p className={styles.mainNavElText}>Galeria</p>
                )}
              </Link>
            </li>
            <li className={styles.mainNavEl}>
              <Link to="/dop/contact">
                {selected === "contact" ? (
                  <p className={styles.mainNavElTextSelected}>Kontakt</p>
                ) : (
                  <p className={styles.mainNavElText}>Kontakt</p>
                )}
              </Link>
            </li>
            <li className={styles.mainNavEl}>
              <Link to="/dop/schedule">
                {selected === "schedule" ? (
                  <p className={styles.mainNavElTextSelected}>Harmonogram</p>
                ) : (
                  <p className={styles.mainNavElText}>Harmonogram</p>
                )}
              </Link>
            </li>
            <li className={styles.mainNavEl}>
              <ul className={styles.socialNavMobile}>
                <li className={styles.socialNavEl}>
                  <a
                    href="https://www.youtube.com/@maciejdop7079"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className={styles.demoIconYt}>&#xf16a;</i>
                  </a>
                </li>
                <li className={styles.socialNavEl}>
                  <a
                    href="https://www.instagram.com/maciejdop/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className={styles.demoIconInsta}>&#xf16d;</i>
                  </a>
                </li>
                <li className={styles.socialNavEl}>
                  <a
                    href="https://www.facebook.com/profile.php?id=100004323405905"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className={styles.demoIconFb}>&#xf308;</i>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div
          className={styles.navMobileBtn}
          onClick={() => {
            toggleMenu(true);
          }}
        >
          <img src={menuIco} alt="ico" className={styles.navMobileBtnIco} />
        </div>
        {token === "admin" && (
          <>
            <div className={styles.helloNav}>
              <p>
                <strong>{import.meta.env.VITE_ADMIN_NAME}</strong>
              </p>
            </div>
          </>
        )}
        <div className={styles.mainNavWrapperMenu}>
          <ul className={styles.mainNavList}>
            <li className={styles.mainNavEl}>
              <Link to="/dop/">
                {selected === "news" ? (
                  <p className={styles.mainNavElTextSelected}>News</p>
                ) : (
                  <p className={styles.mainNavElText}>News</p>
                )}
              </Link>
            </li>
            <li className={styles.mainNavEl}>
              <Link to="/dop/about">
                {selected === "about" ? (
                  <p className={styles.mainNavElTextSelected}>O mnie</p>
                ) : (
                  <p className={styles.mainNavElText}>O mnie</p>
                )}
              </Link>
            </li>
            <li className={styles.mainNavEl}>
              <Link to="/dop/gallery">
                {selected === "gallery" ? (
                  <p className={styles.mainNavElTextSelected}>Galeria</p>
                ) : (
                  <p className={styles.mainNavElText}>Galeria</p>
                )}
              </Link>
            </li>
            <li className={styles.mainNavEl}>
              <Link to="/dop/contact">
                {selected === "contact" ? (
                  <p className={styles.mainNavElTextSelected}>Kontakt</p>
                ) : (
                  <p className={styles.mainNavElText}>Kontakt</p>
                )}
              </Link>
            </li>
            <li className={styles.mainNavEl}>
              <Link to="/dop/schedule">
                {selected === "schedule" ? (
                  <p className={styles.mainNavElTextSelected}>Harmonogram</p>
                ) : (
                  <p className={styles.mainNavElText}>Harmonogram</p>
                )}
              </Link>
            </li>
          </ul>
          <ul className={styles.socialNav}>
            <li className={styles.socialNavEl}>
              <a
                href="https://www.youtube.com/@maciejdop7079"
                target="_blank"
                rel="noreferrer"
              >
                <i className={styles.demoIconYt}>&#xf16a;</i>
              </a>
            </li>
            <li className={styles.socialNavEl}>
              <a
                href="https://www.instagram.com/maciejdop/"
                target="_blank"
                rel="noreferrer"
              >
                <i className={styles.demoIconInsta}>&#xf16d;</i>
              </a>
            </li>
            <li className={styles.socialNavEl}>
              <a
                href="https://www.facebook.com/profile.php?id=100004323405905"
                target="_blank"
                rel="noreferrer"
              >
                <i className={styles.demoIconFb}>&#xf308;</i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
