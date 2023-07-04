import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { ChangeEvent, useRef } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useTitle } from "~/hooks";
import { REGISTER_API } from "~/lib/utils/constants";
import { ChildrenProps } from "~/models";

export default function RegisterPage() {
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: ChangeEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    try {
      const response = await axios.post(REGISTER_API, {
        name: nameRef.current?.value,
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      });

      Cookies.set("token", response.data.token, { expires: 1 });
      navigate("/");
    } catch (err: any) {
      alert(err.message);
      console.error(err);
    }
  }

  useTitle("Register | Longker");

  return (
    <RegisterRoute>
      <Stack align="center" minH="100vh" w="full" px={5} py={24}>
        <Heading textAlign="center">Register</Heading>
        <Box
          maxW="2xl"
          w="full"
          rounded={"lg"}
          bg="white"
          boxShadow={"lg"}
          p={5}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={5}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input ref={emailRef} type="email" name="email" />
              </FormControl>
              <FormControl id="name">
                <FormLabel>Nama</FormLabel>
                <Input ref={nameRef} type="text" name="name" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input ref={passwordRef} type="password" name="password" />
              </FormControl>
              <Stack spacing={4}>
                <Button colorScheme="red" type="submit">
                  Register
                </Button>
                <Text align="center">
                  Already have an account?{" "}
                  <Text
                    as={Link}
                    to="/login"
                    fontWeight="bold"
                    textDecoration="underline"
                    textDecorationStyle="dotted"
                    textUnderlineOffset={5}
                  >
                    Login!
                  </Text>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </RegisterRoute>
  );
}

function RegisterRoute({ children }: ChildrenProps) {
  return (
    <>
      {Cookies.get("token") !== undefined ? (
        <Navigate to="/" />
      ) : Cookies.get("token") === undefined ? (
        children
      ) : null}
    </>
  );
}
