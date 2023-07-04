import {
  Box,
  Heading,
  Image,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import { useTitle } from "~/hooks";

export default function About() {
  useTitle("About | Longker");

  return (
    <Box minH="100vh" maxW="7xl" textAlign="center" w="full" px={5} py={24}>
      <VStack>
        <Heading>About</Heading>
        <Stack
          flexDir={{ base: "column", lg: "row" }}
          justify="center"
          align="center"
          mt={4}
          w={{ base: "full", xl: "5xl" }}
        >
          <Image
            mr={4}
            rounded="3xl"
            src="/images/people-work.jpeg"
            w={{ base: "full", lg: 500 }}
            h={500}
          />
          <Box mt={{ base: 4, lg: 0 }} textAlign="justify">
            <Text>
              <Text
                as="span"
                textDecorationStyle="dashed"
                fontSize="xl"
                textUnderlineOffset={4}
                fontWeight="bold"
                textDecoration="underline"
              >
                Longker
              </Text>{" "}
              adalah perusahaan lowongan kerja terkemuka yang berkomitmen untuk
              menghubungkan bakat terbaik dengan peluang karier yang menarik.
              Kami menyadari betapa pentingnya memiliki pekerjaan yang memuaskan
              dan bermakna dalam kehidupan kita. Oleh karena itu, Longker hadir
              untuk membantu Anda mencapai tujuan karier Anda. Apa yang
              membedakan Longker dari perusahaan lowongan kerja lainnya?
            </Text>
            <UnorderedList spacing={2} mt={4}>
              <ListItem>
                <Text>
                  Pertama, kami memiliki jaringan luas dengan berbagai
                  perusahaan terkemuka di berbagai industri. Dengan kata lain,
                  kami dapat memberikan akses ke beragam peluang pekerjaan yang
                  relevan dan menarik. Baik Anda mencari pekerjaan di bidang
                  teknologi, kreatif, keuangan, atau industri lainnya, Longker
                  akan membantu Anda menemukan pekerjaan yang sesuai dengan
                  keahlian dan minat Anda.
                </Text>
              </ListItem>
              <ListItem>
                <Text>
                  Kedua, Longker memberikan perhatian khusus pada proses seleksi
                  kandidat. Kami percaya bahwa setiap individu memiliki keunikan
                  dan potensi yang luar biasa. Oleh karena itu, kami melakukan
                  pendekatan yang personal dalam mencocokkan kandidat dengan
                  posisi yang tepat. Tim kami akan bekerja sama dengan Anda
                  untuk memahami kebutuhan dan aspirasi Anda, sehingga dapat
                  menemukan pekerjaan yang sesuai dengan profil Anda.
                </Text>
              </ListItem>
            </UnorderedList>
          </Box>
        </Stack>
      </VStack>
    </Box>
  );
}
