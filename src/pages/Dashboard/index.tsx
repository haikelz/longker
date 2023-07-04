import {
  Button,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ProtectedRoute from "~/components/ui/ProtectedRoute";
import { useTitle } from "~/hooks";
import { numberWithCommas } from "~/lib/helpers";
import { JOB_VACANCY_API } from "~/lib/utils/constants";
import { JobVacancyProps } from "~/models";

export default function Dashboard() {
  const [listJobVacancy, setListJobVacancy] = useState<
    JobVacancyProps[] | null
  >(null);
  const [fetchStatus, setFetchStatus] = useState<boolean>(true);

  async function handleDelete(id: number): Promise<void> {
    try {
      await axios.delete(`${JOB_VACANCY_API}/${id}`, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      });

      setFetchStatus(true);
    } catch (err) {
      console.error(err);
    }
  }

  const memoizedListJobVacancy = useMemo(
    () => listJobVacancy?.sort((a, b) => a.id - b.id),
    [listJobVacancy]
  );

  useEffect(() => {
    async function getData(): Promise<void> {
      if (fetchStatus) {
        try {
          const response = await axios.get(JOB_VACANCY_API);
          setListJobVacancy(response.data.data);
        } catch (err) {
          console.error(err);
        }
        setFetchStatus(false);
      }
    }

    getData();
  }, [setListJobVacancy, setFetchStatus, fetchStatus]);

  useTitle("List Job Vacancy | Longker");

  return (
    <ProtectedRoute to="/login">
      <Stack
        justify="center"
        align="center"
        w="full"
        minH="100vh"
        px={5}
        py={24}
        maxW="7xl"
      >
        {memoizedListJobVacancy !== null ? (
          <TableContainer w="full">
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Name</Th>
                  <Th>Company Name</Th>
                  <Th>Salary</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {memoizedListJobVacancy?.map((job) => (
                  <Tr key={job.id}>
                    <Td>{job.id}</Td>
                    <Td>{job.title}</Td>
                    <Td>{job.company_name}</Td>
                    <Td>
                      Rp.{numberWithCommas(job.salary_min)} - Rp.
                      {numberWithCommas(job.salary_max)}
                    </Td>
                    <Td>
                      <Button
                        colorScheme="red"
                        mr={3}
                        onClick={() => handleDelete(job.id)}
                      >
                        Delete
                      </Button>
                      <Button
                        as={Link}
                        to={`/dashboard/edit/${job.id}`}
                        colorScheme="telegram"
                      >
                        Edit
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        ) : (
          <Text mt={10} textAlign="center" fontSize="xl" fontWeight="bold">
            Tidak ada data!
          </Text>
        )}
        <Link to="/dashboard/add">
          <Button mt={5} colorScheme="telegram">
            Add New Job Vacancy
          </Button>
        </Link>
      </Stack>
    </ProtectedRoute>
  );
}
