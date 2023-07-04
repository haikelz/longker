import { ReactNode } from "react";

export interface JobVacancyProps {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  job_description: string;
  job_qualification: string;
  job_type: string;
  job_tenure: string;
  job_status: number;
  company_name: string;
  company_image_url: string;
  company_city: string;
  salary_min: number;
  salary_max: number;
}

export interface ChildrenProps {
  children: ReactNode;
}

export interface JobVacancyContextProps {
  jobs: JobVacancyProps[];
  isLoading: boolean;
}
