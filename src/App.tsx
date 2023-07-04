import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/ui/Layout";
import Loading from "./components/ui/Loading";
import NotFoundPage from "./pages/404";
import About from "./pages/About";
import ChangePassword from "./pages/ChangePassword";
import Dashboard from "./pages/Dashboard";
import AddNewData from "./pages/Dashboard/Add";
import EditData from "./pages/Dashboard/Edit";
import Home from "./pages/Home";
import JobVacancy from "./pages/JobVacancy";
import DetailJobVacancy from "./pages/JobVacancy/DetailJobVacancy";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loading />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/job-vacancy"
            element={
              <Suspense fallback={<Loading />}>
                <JobVacancy />
              </Suspense>
            }
          />
          <Route
            path="/about"
            element={
              <Suspense fallback={<Loading />}>
                <About />
              </Suspense>
            }
          />
          <Route
            path="/job-vacancy/:id"
            element={
              <Suspense fallback={<Loading />}>
                <DetailJobVacancy />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<Loading />}>
                <NotFoundPage />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={<Loading />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <Suspense fallback={<Loading />}>
                <Register />
              </Suspense>
            }
          />
          <Route
            path="/dashboard/add"
            element={
              <Suspense fallback={<Loading />}>
                <AddNewData />
              </Suspense>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<Loading />}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="/dashboard/edit/:id"
            element={
              <Suspense fallback={<Loading />}>
                <EditData />
              </Suspense>
            }
          />
          <Route
            path="/change-password"
            element={
              <Suspense fallback={<Loading />}>
                <ChangePassword />
              </Suspense>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
