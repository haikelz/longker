import { Box, Link, List, Stack, Text, UnorderedList } from "@chakra-ui/react";
import { footerLinkList } from "~/lib/utils/data";

export default function Footer() {
  return (
    <Stack w="full" align="center" justify="center">
      <Stack
        bg="red.500"
        w="full"
        maxW="7xl"
        roundedTop="lg"
        p={5}
        justify={{ base: "flex-start", md: "space-between" }}
        align={{ base: "flex-start", md: "center" }}
        color="white"
        direction={{ base: "column", md: "row" }}
      >
        <Box>
          <Text fontSize="2xl" fontWeight="bold">
            Longker
          </Text>
          <Text my={1}>Jalan Perkodingan No.23, Jakarta Barat</Text>
          <Text>+6281234567890</Text>
        </Box>
        <UnorderedList display="flex" alignItems="center">
          {footerLinkList.map((item) => (
            <List mr={item.name === "Linkedin" ? 0 : 4} key={item.name}>
              <Link fontWeight="semibold" target="_blank" href={item.route}>
                {item.name}
              </Link>
            </List>
          ))}
        </UnorderedList>
      </Stack>
    </Stack>
  );
}
