import { Box, Heading, Text } from "@chakra-ui/react";

export default function Hero() {
  return (
    <Box
      flexDir="column"
      display="flex"
      justifyContent="center"
      textAlign="center"
      alignItems="center"
      px={5}
      h="80vh"
      bgImage="url(/images/work.jpg)"
      bgSize="cover"
      bgRepeat="no-repeat"
      w="full"
    >
      <Heading size="2xl" color="white">
        Solusi Lowongan{" "}
        <Text as="span" color="red.400">
          Pekerjaanmu
        </Text>
      </Heading>
      <Text mt={3} fontWeight="medium" fontSize="lg" color="white">
        Temukan lebih dari 1 juta++ lowongan pekerjaan disini!
      </Text>
    </Box>
  );
}
