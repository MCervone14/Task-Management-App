import CalendarComponent from "@/components/Calendar";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import React from "react";

const getData = async () => {
  const cookie = await getUserFromCookie(cookies());
  const user = await db.user.findUnique({
    where: { id: cookie?.id },
    select: {
      projects: {
        select: {
          name: true,
          createdAt: true,
        },
      },
    },
  });

  return user;
};

const page = async () => {
  const data = await getData();

  return (
    <div>
      <CalendarComponent data={data?.projects} />
    </div>
  );
};

export default page;
