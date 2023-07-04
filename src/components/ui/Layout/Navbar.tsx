import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  HStack,
  Heading,
  IconButton,
  List,
  Stack,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { navLinkList } from "~/lib/utils/data";

export default function Navbar() {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleLogout() {
    Cookies.remove("token");
    navigate("/login");
  }

  return (
    <>
      <Stack
        justify="center"
        align="center"
        w="full"
        borderBottom={2}
        borderStyle="solid"
        borderBottomColor="gray.200"
        bg="white"
        position="fixed"
        zIndex={20}
        top={0}
      >
        <HStack
          alignItems="center"
          w="full"
          py={3}
          maxW="7xl"
          px={5}
          justify="space-between"
        >
          <HStack>
            <Heading as={Link} to="/" fontSize="3xl" mr={10}>
              Longker
            </Heading>
            <UnorderedList
              display={{ base: "none", md: "flex" }}
              justifyContent="center"
              alignItems="center"
            >
              <List mr={4}>
                <Text
                  textDecoration={pathname === "/" ? "underline" : ""}
                  textDecorationStyle="dotted"
                  textUnderlineOffset={5}
                  px={1}
                  as={NavLink}
                  to="/"
                  fontWeight={pathname === "/" ? "bold" : "medium"}
                >
                  Beranda
                </Text>
              </List>
              {navLinkList.map((item) => (
                <List key={item.name} mr={item.name === "Lowongan" ? 0 : 4}>
                  <Text
                    textDecoration={
                      pathname.includes(item.route) ? "underline" : ""
                    }
                    textDecorationStyle="dotted"
                    textUnderlineOffset={5}
                    px={1}
                    as={NavLink}
                    to={item.route}
                    fontWeight={
                      pathname.includes(item.route) ? "bold" : "medium"
                    }
                  >
                    {item.name}
                  </Text>
                </List>
              ))}
            </UnorderedList>
          </HStack>
          <Box display={{ base: "none", md: "block" }}>
            {Cookies.get("token") ? (
              <HStack>
                <Button onClick={handleLogout} colorScheme="red">
                  Logout
                </Button>
              </HStack>
            ) : (
              <Button as={Link} to="/login" colorScheme="red">
                Login
              </Button>
            )}
          </Box>
          <IconButton
            aria-label="open and close"
            display={{ base: "block", md: "none" }}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            onClick={() => setIsOpen(!isOpen)}
          />
        </HStack>
        {isOpen ? (
          <VStack p={5} gap={5} w="full" display={{ base: "flex", md: "none" }}>
            <Button
              textDecoration={pathname === "/" ? "underline" : ""}
              fontWeight={pathname === "/" ? "bold" : "medium"}
              textDecorationStyle="dotted"
              textUnderlineOffset={5}
              as={Link}
              to="/"
              w="full"
            >
              Beranda
            </Button>
            {navLinkList.map((item) => (
              <Button
                textDecoration={
                  pathname.includes(item.route) ? "underline" : ""
                }
                fontWeight={pathname.includes(item.route) ? "bold" : "medium"}
                textDecorationStyle="dotted"
                textUnderlineOffset={5}
                as={Link}
                key={item.name}
                to={item.route}
                w="full"
              >
                {item.name}
              </Button>
            ))}
            {Cookies.get("token") ? (
              <Button onClick={handleLogout} colorScheme="red" w="full">
                Logout
              </Button>
            ) : (
              <Button as={Link} to="/login" colorScheme="red" w="full">
                Login
              </Button>
            )}
          </VStack>
        ) : null}
      </Stack>
    </>
  );
}
