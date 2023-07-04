import {
  Box,
  Button,
  Grid,
  Image,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "~/lib/context";
import { JobVacancyContextProps } from "~/models";

export default function ListJobs() {
  const { jobs, isLoading } = useContext(Context) as JobVacancyContextProps;

  return (
    <Grid
      mt={10}
      templateColumns={{
        base: "repeat(1, minmax(0, 1fr))",
        sm: "repeat(2, minmax(0, 1fr))",
        md: "repeat(3, minmax(0, 1fr))",
      }}
      gap={6}
    >
      {!isLoading ? (
        jobs.map((job) => (
          <Box
            h="fit-content"
            overflow="hidden"
            transition="0.2s ease-in-out"
            _hover={{ transform: "scale(1.02)", cursor: "pointer" }}
            shadow="lg"
            key={job.id}
            rounded="lg"
          >
            <Image src={job.company_image_url} w="full" h={200} />
            <Box p={6}>
              <Text fontWeight="bold" fontSize="xl">
                {job.title}
              </Text>
              <Text mt={1} fontSize="sm" fontWeight="semibold">
                {job.company_name}, {job.company_city}
              </Text>
              <Text noOfLines={3} mt={3} mb={5}>
                {job.job_description}
              </Text>
              <VStack justify="flex-start" alignItems="flex-start">
                <Text bg="yellow.300" px={1} fontWeight="medium">
                  {job.job_tenure}
                </Text>
              </VStack>
              <Button
                mt={5}
                as={Link}
                to={`/job-vacancy/${job.id}`}
                colorScheme="red"
                w="full"
              >
                Lihat Lebih Detail
              </Button>
            </Box>
          </Box>
        ))
      ) : (
        <>
          {new Array(9)
            .fill(null)
            .map((_, index) => index + 1)
            .map((item) => (
              <Skeleton key={item}>
                <Box
                  h="fit-content"
                  overflow="hidden"
                  transition="0.2s ease-in-out"
                  _hover={{ transform: "scale(1.02)", cursor: "pointer" }}
                  shadow="lg"
                  rounded="lg"
                >
                  <Image src="https://placehold.co/600x400" w="full" h={200} />
                  <Box p={6}>
                    <Text fontWeight="bold" fontSize="xl"></Text>
                    <Text mt={1} fontSize="sm" fontWeight="semibold"></Text>
                    <Text noOfLines={3} mt={3} mb={5}>
                      {item}
                    </Text>
                    <Button mt={5} as={Link} colorScheme="red" w="full">
                      Lihat Lebih Detail
                    </Button>
                  </Box>
                </Box>
              </Skeleton>
            ))}
        </>
      )}
    </Grid>
  );
}
