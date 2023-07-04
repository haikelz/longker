import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "~/components/ui/ProtectedRoute";
import { useTitle } from "~/hooks";
import { CHANGE_PASSWORD_API } from "~/lib/utils/constants";

interface FormDataProps {
  current_password: string;
  new_password: string;
  new_confirm_password: string;
}

type IndexTargetValueProps = Record<string, string> & FormDataProps;

export default function ChangePassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormDataProps>({
    current_password: "",
    new_password: "",
    new_confirm_password: "",
  });

  const inputsList = [
    {
      name: "current_password",
      value: formData.current_password,
    },
    { name: "new_password", value: formData.new_password },
    { name: "new_confirm_password", value: formData.new_confirm_password },
  ];

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const data: IndexTargetValueProps = { ...formData };
    data[e.target.name] = e.target.value;

    setFormData(data);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await axios.post(CHANGE_PASSWORD_API, formData, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    setFormData({
      current_password: "",
      new_password: "",
      new_confirm_password: "",
    });

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
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              {inputsList.map((item) => (
                <FormControl key={item.name}>
                  <FormLabel textTransform="capitalize">
                    {item.name.split("_").join(" ")}
                  </FormLabel>
                  <Input
                    type="password"
                    name={item.name}
                    value={item.value}
                    onChange={handleChange}
                  />
                </FormControl>
              ))}
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
