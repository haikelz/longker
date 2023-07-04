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
import { LOGIN_API } from "~/lib/utils/constants";
import { ChildrenProps } from "~/models";

export default function LoginPage() {
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: ChangeEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_API, {
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      });

      Cookies.set("token", response.data.token, { expires: 7 });
      navigate("/");
    } catch (err: any) {
      alert(err.message);
      console.error(err);
    }
  }

  useTitle("Login | Longker");

  return (
    <LoginRoute>
      <Stack align="center" minH="100vh" w="full" px={5} py={24}>
        <Heading textAlign="center">Login to Longker</Heading>
        <Box
          maxW="2xl"
          w="full"
          rounded="lg"
          bg="white"
          boxShadow="lg"
          p={5}
          mt={6}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={5}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input ref={emailRef} type="email" name="email" required />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  ref={passwordRef}
                  type="password"
                  name="password"
                  required
                />
              </FormControl>
              <Stack spacing={4}>
                <Button colorScheme="red" type="submit">
                  Sign in
                </Button>
                <Text align="center">
                  Not Registered Yet?{" "}
                  <Text
                    as={Link}
                    to="/register"
                    fontWeight="bold"
                    textDecoration="underline"
                    textDecorationStyle="dotted"
                    textUnderlineOffset={5}
                  >
                    Register!
                  </Text>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </LoginRoute>
  );
}

function LoginRoute({ children }: ChildrenProps) {
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
