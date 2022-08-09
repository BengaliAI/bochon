import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import { SideNav } from "./sideNav";
import { RiMenuLine } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export const NavDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pathname } = useLocation();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(onClose, [pathname]);

  return (
    <>
      <Icon as={RiMenuLine} onClick={onOpen} fontSize="3xl" />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <SideNav />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
