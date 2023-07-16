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
import { REGISTER_API } from "~/lib/utils/constants";
import { registerSchema } from "~/lib/utils/schema";
import { ChildrenProps } from "~/models";

export default function RegisterPage() {
  const navigate = useNavigate();

  const {
    getValues,
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: nopeResolver(registerSchema),
  });

  async function onSubmit(): Promise<void> {
    try {
      const response = await axios.post(REGISTER_API, {
        name: getValues("name"),
        email: getValues("email"),
        password: getValues("password"),
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={5}>
              <FormControl isInvalid={!!errors.email}>
                <FormLabel>Email address</FormLabel>
                <Input {...register("email")} type="email" name="email" />
                {errors.email ? (
                  <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                ) : null}
              </FormControl>
              <FormControl isInvalid={!!errors.name}>
                <FormLabel>Nama</FormLabel>
                <Input {...register("name")} type="text" name="name" />
                {errors.name ? (
                  <FormErrorMessage>{errors.name.message}</FormErrorMessage>
                ) : null}
              </FormControl>
              <FormControl isInvalid={!!errors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  {...register("password")}
                  type="password"
                  name="password"
                />
                {errors.password ? (
                  <FormErrorMessage>
                    {errors.password?.message}
                  </FormErrorMessage>
                ) : null}
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
