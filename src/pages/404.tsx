import { Box, Heading, Text } from "@chakra-ui/react";

export default function NotFoundPage() {
  return (
    <Box minH="100vh" maxW="7xl" textAlign="center" w="full" px={5} py={24}>
      <Heading>404 Not Found!</Heading>
      <Text fontWeight="medium" mt={1}>
        Halaman yang kamu tuju tidak ditemukan
      </Text>
    </Box>
  );
}
