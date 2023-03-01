import { Menu, Divider, createStyles, Modal } from "@mantine/core";
import { UserCheck, UserOff, User } from "tabler-icons-react";
import { useDispatch, useSelector } from "react-redux";
import {
  showLoginNav,
  hiddeRegisterForm,
  hiddeLoginNav,
} from "@/store/actions/modalAction";
import Link from "next/link";

import { useMediaQuery } from "@mantine/hooks";
import Login from "./Login";
import PublicModal from "./PublicModal";
import Register from "./Register";
import { logout } from "@/store/actions/authAction";

const useStyles = createStyles((theme) => ({
  item: {
    "&[data-hovered]": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.violet[9],
      color: theme.white,
    },
  },
}));

export default function MenuNavbar() {
  const dispatch = useDispatch();
  const largeScreen = useMediaQuery("(min-width: 1024px)");
  const { isAuth } = useSelector((state) => state.authReducer);
  const { showingLoginNav, showingRegisterForm } = useSelector(
    (state) => state.modalReducer
  );

  const { classes } = useStyles();

  const handleClick = (event) => {
    event.preventDefault();
    dispatch(showLoginNav());
  };

  const handleClick2 = async (event) => {
    event.preventDefault();
    dispatch(logout());
  };

  return (
    <>
      <Menu
        ff="raustila"
        position="right"
        offset={10}
        radius="lg"
        trigger="hover"
        openDelay={100}
        closeDelay={400}
        transition="rotate-right"
        transitionDuration={150}
        withArrow
        classNames={classes}
      >
        <Menu.Target>
          <button type="button">Perfil</button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>User</Menu.Label>

          {isAuth ? (
            <Menu.Item onClick={handleClick2} icon={<UserOff size={14} />}>
              Logout
            </Menu.Item>
          ) : (
            <Menu.Item onClick={handleClick} icon={<UserCheck size={14} />}>
              Login
            </Menu.Item>
          )}

          <Divider />

          {isAuth ? (
            <Link href="/userProfile" prefetch={false}>
              <Menu.Item icon={<User size={14} />}>Perfil</Menu.Item>
            </Link>
          ) : (
            <Menu.Item>Wellcome</Menu.Item>
          )}
        </Menu.Dropdown>
      </Menu>
      <PublicModal
        opened={showingRegisterForm}
        onClose={() => dispatch(hiddeRegisterForm())}
        size={largeScreen ? "50%" : "90%"}
      >
        <Register />
      </PublicModal>
      <PublicModal
        opened={showingLoginNav}
        onClose={() => dispatch(hiddeLoginNav())}
        size={largeScreen ? "30%" : "90%"}
      >
        <Login />
      </PublicModal>
      <style jsx>
        {`
          button {
            border: none;
            background: none;
            font-family: raustila;
            color: #9b0ad0;
            display: block;
            font-size: 32px;
            direction: ltr;
            font-weight: 400;
            font-style: normal;
            cursor: pointer;
            text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
          }
        `}
      </style>
    </>
  );
}
