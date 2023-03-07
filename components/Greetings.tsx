import { getUserFromCookie } from "@/lib/auth";
import { cookies } from "next/headers";
import Button from "./Button";
import Card from "./Card";
import Link from "next/link";

const getData = async () => {
  const user = await getUserFromCookie(cookies());
  return user;
};

const Greetings = async () => {
  const user = await getData();

  return (
    <Card className="w-full ml-5 py-4 relative bg-white">
      <div className="mb-4">
        <h1 className="text-3xl text-gray-700 font-bold mb-4">
          Hello, {user ? `${user.firstName} ${user.lastName}` : "Guest"}!
        </h1>
        <h4 className="text-xl text-gray-400">
          Check your daily tasks and schedule
        </h4>
      </div>
      <div>
        <Link href="/calendar">
          <Button size="large" intent="secondary">
            Today&#39;s Schedule
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default Greetings;
