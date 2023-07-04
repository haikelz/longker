import { Box, Stack, Text } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Stack minH="100vh" justify="center" align="center">
      <Box>
        <Text align="center" fontWeight="semibold" fontSize="2xl">
          Loading....
        </Text>
      </Box>
    </Stack>
  );
}
