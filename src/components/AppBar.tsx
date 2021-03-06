import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Image,
  Menu,
  MenuButton,
  Text,
} from "@chakra-ui/react";
import { FaSignOutAlt } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { signOut, useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectSideNavigation,
  toggleSideNavigation,
} from "../features/sideNavigation/sideNavigationSlice";
import { useRouter } from "next/router";

const AppBar = () => {
  const router = useRouter();

  const onLogoPressed = () => {
    router.push("/");
  };

  return (
    <HStack
      p="4"
      bg={"white"}
      w="full"
      display="flex"
      position={"sticky"}
      top="0"
      zIndex={"1"}
    >
      <Image
        cursor={"pointer"}
        onClick={onLogoPressed}
        src="/buyonic-logo.png"
        alt=""
      />
    </HStack>
  );
};

export default AppBar;
