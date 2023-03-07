import { TASK_STATUS } from "@prisma/client";

const fetcher = async ({ url, method, body, json = true }) => {
  const res = await fetch(url, {
    method,
    body: body && JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    next: { revalidate: 1 },
  });

  if (!res.ok) {
    throw new Error("API Error");
  }

  if (json) {
    const data = await res.json();
    return data;
  }
};

export const register = async (user) => {
  return fetcher({
    url: "/api/register",
    method: "POST",
    body: user,
    json: false,
  });
};

export const signin = async (user) => {
  return fetcher({
    url: "/api/signin",
    method: "POST",
    body: user,
    json: false,
  });
};

export const createNewProject = (name: string) => {
  return fetcher({
    url: "/api/project",
    method: "POST",
    body: { name },
  });
};

export const createNewTask = (
  name: string,
  description: string,
  due: string,
  status: TASK_STATUS | string,
  projectId: string
) => {
  return fetcher({
    url: "/api/task",
    method: "POST",
    body: { name, description, due, status, projectId },
  });
};

export const deleteAction = (id: string, endpoint: string) => {
  return fetcher({
    url: "/api/delete",
    method: "DELETE",
    body: { id, endpoint },
  });
};
