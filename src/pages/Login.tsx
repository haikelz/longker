import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { nopeResolver } from "@hookform/resolvers/nope";
import axios from "axios";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useTitle } from "~/hooks";
import { LOGIN_API } from "~/lib/utils/constants";
import { loginSchema } from "~/lib/utils/schema";
import { ChildrenProps } from "~/models";

export default function LoginPage() {
  const navigate = useNavigate();

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: nopeResolver(loginSchema),
  });

  async function onSubmit(): Promise<void> {
    try {
      const response = await axios.post(LOGIN_API, {
        email: getValues("email"),
        password: getValues("password"),
      });

      navigate("/");
      Cookies.set("token", response.data.token, { expires: 7 });
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={5}>
              <FormControl isInvalid={!!errors.email}>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input {...register("email")} type="email" name="email" />
                {errors.email ? (
                  <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                ) : null}
              </FormControl>
              <FormControl isInvalid={!!errors.password}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  {...register("password")}
                  type="password"
                  name="password"
                />
                {errors.password ? (
                  <FormErrorMessage>{errors.password.message}</FormErrorMessage>
                ) : null}
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
