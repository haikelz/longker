import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { nopeResolver } from "@hookform/resolvers/nope";
import axios from "axios";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "~/components/ui/ProtectedRoute";
import { useTitle } from "~/hooks";
import { CHANGE_PASSWORD_API } from "~/lib/utils/constants";
import { changePasswordSchema } from "~/lib/utils/schema";

export default function ChangePassword() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      current_password: "",
      new_password: "",
      new_confirm_password: "",
    },
    resolver: nopeResolver(changePasswordSchema),
  });

  async function onSubmit() {
    await axios.post(
      CHANGE_PASSWORD_API,
      {
        current_password: getValues("current_password"),
        new_password: getValues("new_password"),
        new_confirm_password: getValues("new_confirm_password"),
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );

    Cookies.remove("token");
    navigate("/login");
  }

  useTitle("Change Password | Longker");

  return (
    <ProtectedRoute to="/login">
      <Stack align="center" w="full" minH="100vh" px={5} py={24}>
        <Heading textAlign="center">Change Password</Heading>
        <Box
          w="full"
          maxW="2xl"
          rounded="lg"
          bg="white"
          boxShadow="lg"
          p={5}
          mt={6}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl isInvalid={!!errors.current_password}>
                <FormLabel textTransform="capitalize">
                  Current Password
                </FormLabel>
                <Input
                  {...register("current_password")}
                  type="password"
                  name="current_password"
                />
                {errors.current_password ? (
                  <FormErrorMessage>
                    {errors.current_password.message}
                  </FormErrorMessage>
                ) : null}
              </FormControl>
              <FormControl isInvalid={!!errors.new_password}>
                <FormLabel textTransform="capitalize">New Password</FormLabel>
                <Input
                  {...register("new_password")}
                  type="password"
                  name="new_password"
                />
                {errors.new_password ? (
                  <FormErrorMessage>
                    {errors.new_password.message}
                  </FormErrorMessage>
                ) : null}
              </FormControl>
              <FormControl isInvalid={!!errors.new_confirm_password}>
                <FormLabel textTransform="capitalize">
                  Confirm New Password
                </FormLabel>
                <Input
                  {...register("new_confirm_password")}
                  type="password"
                  name="new_confirm_password"
                />
                {errors.new_confirm_password ? (
                  <FormErrorMessage>
                    {errors.new_confirm_password.message}
                  </FormErrorMessage>
                ) : null}
              </FormControl>
              <Stack spacing={10}>
                <Button type="submit" colorScheme="red">
                  Submit
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </ProtectedRoute>
  );
}
