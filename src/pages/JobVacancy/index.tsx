import { Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import ListJobs from "~/components/ui/ListJobs";
import { useTitle } from "~/hooks";
import { Context } from "~/lib/context";
import { JOB_VACANCY_API } from "~/lib/utils/constants";
import { JobVacancyProps } from "~/models";

export default function JobVacancy() {
  const [jobs, setJobs] = useState<JobVacancyProps[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedTenure, setSelectedTenure] = useState<string | null>(null);

  const memoizedFilteredJobs = useMemo(
    () =>
      jobs.filter((item) => {
        if (selectedTitle !== null) return selectedTitle === item.title;
        if (selectedCity !== null) return selectedCity === item.company_city;
        if (selectedTenure !== null) return selectedTenure === item.job_tenure;

        if (search === "") return item;
        else if (item.title.toLowerCase().includes(search.toLowerCase()))
          return item;
      }),
    [search, jobs, selectedTitle, selectedCity, selectedTenure]
  );
  const filteredCity = jobs.filter((item) => item.company_city !== "Jakarta");
  const filteredTenure = jobs.filter((item) => item.job_tenure !== "Full-Time");

  useEffect(() => {
    async function getData(): Promise<void> {
      try {
        const response = await axios.get(JOB_VACANCY_API);

        setJobs(response.data.data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    }

    getData();
  }, [setJobs, setIsLoading]);

  useTitle("Job Vacancy | Longker");

  return (
    <Box minH="100vh" px={5} maxW="7xl" w="full" py={24}>
      <Box textAlign="center" mb={5}>
        <Heading mb={1}>Job Vacancy</Heading>
        <Text>Cari lowongan pekerjaan sesuai keahlianmu!</Text>
      </Box>
      <VStack justify="center" align="center">
        <InputGroup w={{ base: "full", md: "xl" }}>
          <InputLeftAddon children={<Search2Icon />} />
          <Input
            type="search"
            onChange={(e) => setSearch(e.target.value)}
            name="search"
          />
        </InputGroup>
        <Box mt={3}>
          <Stack direction={{ base: "column", sm: "row" }}>
            <Select
              w={{ base: "full", md: 64 }}
              placeholder="Sort By Title"
              onChange={(e) => setSelectedTitle(e.target.value)}
            >
              {jobs.map((job) => (
                <option key={job.id} value={job.title}>
                  {job.title}
                </option>
              ))}
            </Select>
            <Select
              w={{ base: "full", md: 64 }}
              placeholder="Sort By Company City"
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              {(
                [
                  ...filteredCity,
                  { id: 3367, company_city: "Jakarta" },
                ] as JobVacancyProps[]
              ).map((job) => (
                <option key={job.id} value={job.company_city}>
                  {job.company_city}
                </option>
              ))}
            </Select>
            <Select
              w={{ base: "full", md: 64 }}
              placeholder="Sort By Tenure"
              onChange={(e) => setSelectedTenure(e.target.value)}
            >
              {(
                [
                  ...filteredTenure,
                  { id: 3367, job_tenure: "Full-Time" },
                ] as JobVacancyProps[]
              ).map((job) => (
                <option key={job.id} value={job.job_tenure}>
                  {job.job_tenure}
                </option>
              ))}
            </Select>
          </Stack>
        </Box>
      </VStack>
      <Box pt={10} pb={20}>
        <Context.Provider value={{ jobs: memoizedFilteredJobs, isLoading }}>
          <ListJobs />
        </Context.Provider>
      </Box>
    </Box>
  );
}
