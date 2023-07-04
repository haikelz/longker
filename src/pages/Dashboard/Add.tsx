import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { FormEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "~/components/ui/ProtectedRoute";
import { useTitle } from "~/hooks";
import { JOB_VACANCY_API } from "~/lib/utils/constants";

export default function AddNewData() {
  const navigate = useNavigate();

  const titleRef = useRef<HTMLInputElement>(null);
  const jobDescriptionRef = useRef<HTMLTextAreaElement>(null);
  const jobQualificationRef = useRef<HTMLTextAreaElement>(null);
  const jobTypeRef = useRef<HTMLInputElement>(null);
  const jobTenureRef = useRef<HTMLInputElement>(null);
  const jobStatusRef = useRef<HTMLInputElement>(null);
  const companyNameRef = useRef<HTMLInputElement>(null);
  const companyImageUrlRef = useRef<HTMLInputElement>(null);
  const companyCityRef = useRef<HTMLInputElement>(null);
  const salaryMinRef = useRef<HTMLInputElement>(null);
  const salaryMaxRef = useRef<HTMLInputElement>(null);

  const inputsList = [
    {
      ref: titleRef,
      label: "title",
      name: "Title",
    },
    {
      ref: jobDescriptionRef,
      label: "job_description",
      name: "Description",
    },
    {
      ref: jobQualificationRef,
      label: "job_qualification",
      name: "Qualification",
    },
    {
      ref: jobTypeRef,
      label: "job_type",
      name: "Type",
    },
    {
      ref: jobTenureRef,
      label: "job_tenure",
      name: "Tenure",
    },
    {
      ref: jobStatusRef,
      label: "job_status",
      name: "Status",
    },
    {
      ref: companyNameRef,
      label: "company_name",
      name: "Company Name",
    },
    {
      ref: companyImageUrlRef,
      label: "company_image_url",
      name: "Company Image URL",
    },
    {
      ref: companyCityRef,
      label: "company_city",
      name: "City",
    },
    {
      ref: salaryMinRef,
      label: "salary_min",
      name: "Salary Minimum",
    },
    {
      ref: salaryMaxRef,
      label: "salary_max",
      name: "Salary Maximum",
    },
  ];

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await axios.post(
        JOB_VACANCY_API,
        {
          title: titleRef.current?.value,
          job_description: jobDescriptionRef.current?.value,
          job_qualification: jobQualificationRef.current?.value,
          job_type: jobTypeRef.current?.value,
          job_tenure: jobTenureRef.current?.value,
          job_status: jobStatusRef.current?.value,
          company_name: companyNameRef.current?.value,
          company_image_url: companyImageUrlRef.current?.value,
          company_city: companyCityRef.current?.value,
          salary_min: salaryMinRef.current?.value,
          salary_max: salaryMaxRef.current?.value,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  }

  useTitle("Add New Data | Longker");

  return (
    <ProtectedRoute to="/login">
      <Stack align="center" w="full" minH="100vh" px={5} py={24}>
        <Heading textAlign="center">Add New Data</Heading>
        <Box w="full" maxW="2xl" rounded="lg" bg="white" boxShadow="lg" p={5}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              {inputsList.map((item) => (
                <FormControl key={item.label}>
                  <FormLabel textTransform="capitalize">{item.name}</FormLabel>
                  {item.name !== "Description" &&
                  item.name !== "Qualification" ? (
                    <Input
                      type={
                        item.name !== "Salary Maximum" &&
                        item.name !== "Salary Minimum" &&
                        item.name !== "Status"
                          ? "text"
                          : "number"
                      }
                      name={item.name}
                      ref={item.ref as any}
                    />
                  ) : (
                    <Textarea name={item.name} ref={item.ref as any} />
                  )}
                </FormControl>
              ))}
              <Stack spacing={10}>
                <Button type="submit" colorScheme="red">
                  Submit
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </ProtectedRoute>
  );
}
