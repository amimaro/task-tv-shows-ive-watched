import { ErrorMessage, Field, Form, Formik } from "formik";
import type { NextPage } from "next";
import Head from "next/head";
import { AppButton } from "../components/AppButton";
import AppTitle from "../components/AppTitle";
import { postData } from "../utils/helpers";

const Login: NextPage = () => {
  return (
    <div className="h-full">
      <Head>
        <title>{"TV shows I've watched"}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full md:w-1/2 mx-auto mt-28 border-2 border-teal-700 shadow-md shadow-teal-700 rounded-md px-4 py-6">
        <Formik
          initialValues={{
            username: process.env.NEXT_PUBLIC_DEBUG_MY_USERNAME || "",
            password: process.env.NEXT_PUBLIC_DEBUG_MY_PASSWORD || "",
          }}
          validate={(values) => {
            const errors: { username?: string; password?: string } = {};
            if (!values.username) {
              errors.username = "Username is Required";
            } else if (!/^[A-Z]{4,18}$/i.test(values.username)) {
              errors.username = "Invalid username";
            }
            if (!values.password) {
              errors.password = "Password is Required";
            } else if (values.password.length < 8) {
              errors.password = "Password must contain at least 8 characters";
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            const response = await postData({
              url: "/api/login",
              data: values,
            });
            console.log(response);
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <div className="flex flex-col gap-4 items-center">
                <div className="w-full flex flex-col gap-2">
                  <label htmlFor="password" className="font-semibold pl-1">
                    Username
                  </label>
                  <Field
                    id="username"
                    type="username"
                    name="username"
                    placeholder="Enter your username"
                    className={`border-2 border-teal-700 w-full p-2 focus:ring-4 ring-teal-700 bg-transparent rounded-md ${
                      errors.username && touched.username && errors.username
                        ? "ring-2 ring-red-500"
                        : "focus:ring-2 ring-teal-500"
                    }`}
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-xs text-red-500 pl-2"
                  />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <label htmlFor="password" className="font-semibold pl-1">
                    Password
                  </label>
                  <Field
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className={`border-2 border-teal-700 w-full p-2 focus:ring-4 ring-teal-700 bg-transparent rounded-md ${
                      errors.password && touched.password && errors.password
                        ? "ring-2 ring-red-500"
                        : "focus:ring-2 ring-teal-500"
                    }`}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-xs text-red-500 pl-2"
                  />
                </div>
                <AppButton
                  type="submit"
                  className="w-full"
                  isSubmitting={isSubmitting}
                >
                  Login
                </AppButton>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
