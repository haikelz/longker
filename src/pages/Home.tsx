import { Box } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Hero from "~/components/ui/Hero";
import ListJobs from "~/components/ui/ListJobs";
import { Context } from "~/lib/context";
import { JOB_VACANCY_API } from "~/lib/utils/constants";
import { JobVacancyProps } from "~/models";

export default function Home() {
  const [jobs, setJobs] = useState<JobVacancyProps[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  return (
    <>
      <Hero />
      <Box minH="100vh" maxW="7xl" w="full" px={5} py={{ base: 10, md: 16 }}>
        <Context.Provider
          value={{ jobs: jobs as JobVacancyProps[], isLoading }}
        >
          <ListJobs />
        </Context.Provider>
      </Box>
    </>
  );
}
