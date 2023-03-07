"use client";
import { register, signin } from "@/lib/api";
import { useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Card from "./Card";
import Button from "./Button";
import Input from "./Input";

const registerContent = {
  linkUrl: "/signin",
  linkText: "Already have an account?",
  header: "Create a new Account",
  subheader: "Fill out the form to register your account",
  buttonText: "Register",
};

const signinContent = {
  linkUrl: "/register",
  linkText: "Don't have an account?",
  header: "Welcome Back",
  subheader: "Enter your credentials to access your account",
  buttonText: "Sign In",
};

const initial = { email: "", password: "", firstName: "", lastName: "" };

export default function AuthForm({ mode }: { mode: "register" | "signin" }) {
  const [formState, setFormState] = useState({ ...initial });
  const [error, setError] = useState("");

  const router = useRouter();
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        if (mode === "register") {
          await register(formState);
        } else {
          await signin(formState);
        }

        router.replace("/home");
      } catch (e) {
        setError(`Could not ${mode}`);
      } finally {
        setFormState({ ...initial });
      }
    },
    [router, mode, formState]
  );

  const content = mode === "register" ? registerContent : signinContent;

  return (
    <Card className="bg-inherit">
      <div className="w-full">
        <div className="text-center">
          <h2 className="text-5xl mb-2 text-white">{content.header}</h2>
          <p className="tex-lg text-white/50">{content.subheader}</p>
        </div>
        <form onSubmit={handleSubmit} className="py-10 w-full">
          {mode === "register" && (
            <div className="flex mb-8 justify-between">
              <div className="pr-2">
                <label
                  htmlFor="register-firstName"
                  className="text-lg ml-2 font-semibold text-blue-800"
                >
                  First Name
                </label>
                <Input
                  id="register-firstName"
                  required
                  placeholder="Tim"
                  value={formState.firstName}
                  className="border-solid border-gray mt-3 border-2 px-6 py-2 text-lg rounded-3xl w-full focus:outline-blue-900"
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, firstName: e.target.value }))
                  }
                />
              </div>
              <div className="pl-2">
                <label
                  htmlFor="register-lastName"
                  className="text-lg ml-2 font-semibold text-blue-800"
                >
                  Last Name
                </label>
                <Input
                  id="register-lastName"
                  required
                  placeholder="Apple"
                  autocomplete="name"
                  value={formState.lastName}
                  className="border-solid border-gray mt-3 border-2 px-6 py-2 text-lg rounded-3xl w-full focus:outline-blue-900"
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, lastName: e.target.value }))
                  }
                />
              </div>
            </div>
          )}
          <div className="mb-8">
            <label
              htmlFor="register-email"
              className="text-lg ml-2 font-semibold text-blue-800"
            >
              Email
            </label>
            <Input
              id="register-email"
              required
              type="email"
              placeholder="TimApple@apple.com"
              autocomplete="email"
              value={formState.email}
              className="border-solid border-gray mt-3 border-2 px-6 py-2 text-lg rounded-3xl w-full focus:outline-blue-900"
              onChange={(e) =>
                setFormState((s) => ({ ...s, email: e.target.value }))
              }
            />
          </div>
          <div className="mb-8">
            <label
              className="text-lg ml-2 font-semibold text-blue-800"
              htmlFor="register-password"
            >
              Password
            </label>
            <Input
              id="register-password"
              required
              value={formState.password}
              type="password"
              placeholder="Please choose a strong password!"
              autocomplete="new-password"
              className="border-solid border-gray border-2 px-6 py-2 text-lg mt-3 rounded-3xl w-full focus:outline-blue-800"
              onChange={(e) =>
                setFormState((s) => ({ ...s, password: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="mb-5">
              <Button type="submit" intent="secondary">
                {content.buttonText}
              </Button>
            </div>
            <div>
              <span>
                <Link
                  href={content.linkUrl}
                  className="text-lg font-bold text-blue-900 hover:text-white"
                >
                  {content.linkText}
                </Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
}
