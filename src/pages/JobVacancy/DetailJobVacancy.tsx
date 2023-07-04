import { Box, Image, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTitle } from "~/hooks";
import { numberWithCommas } from "~/lib/helpers";
import { JOB_VACANCY_API } from "~/lib/utils/constants";
import { JobVacancyProps } from "~/models";

export default function DetailJobVacancy() {
  const { id } = useParams();

  const [jobDetail, setJobDetail] = useState<JobVacancyProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getData(): Promise<void> {
      try {
        const response = await axios.get(`${JOB_VACANCY_API}/${id}`);

        setJobDetail(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    }

    getData();
  }, [setJobDetail, setIsLoading]);

  useTitle("Detail Job Vacancy");

  return (
    <Box minH="100vh" maxW="7xl" w="full" px={5} py={24}>
      {!isLoading ? (
        <Box w={{ md: "3xl" }}>
          <Image
            src={jobDetail?.company_image_url}
            w={300}
            h={250}
            rounded="md"
          />
          <Text mt={3} fontWeight="bold" fontSize="2xl">
            {jobDetail?.title}
          </Text>
          <Text fontWeight="semibold">
            {jobDetail?.company_name}, {jobDetail?.company_city}
          </Text>
          <Text mt={3} fontWeight="medium">
            Rp.{numberWithCommas(jobDetail?.salary_min as number)}- Rp.
            {numberWithCommas(jobDetail?.salary_max as number)}
          </Text>
          <Text my={3}>
            <Text as="span" fontWeight="bold">
              Jobdesk:{" "}
            </Text>
            {jobDetail?.job_description}
          </Text>
          <Box>
            <Text as="span" fontWeight="bold">
              Kualifikasi:{" "}
            </Text>
            <UnorderedList>
              {(jobDetail?.job_qualification as string)
                .split("\n")
                .map((item, index) => (
                  <ListItem key={index + 1}>
                    <Text>{item}</Text>
                  </ListItem>
                ))}
            </UnorderedList>
          </Box>
        </Box>
      ) : (
        <Text fontWeight="semibold" fontSize="xl">
          Loading....
        </Text>
      )}
    </Box>
  );
}
