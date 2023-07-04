import { createContext } from "react";
import { JobVacancyProps } from "~/models";

export const Context = createContext<{
  jobs: JobVacancyProps[];
  isLoading: boolean;
} | null>(null);
