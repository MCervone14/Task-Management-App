import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { TASK_STATUS } from "@prisma/client";
import { cookies } from "next/headers";
import { Trash2 } from "react-feather";
import Button from "./Button";
import Card from "./Card";
import ClientButtonWrapper from "./ClientButtonWrapper";

import NewTask from "./NewTask";

const getData = async () => {
  const user = await getUserFromCookie(cookies());
  const tasks = await db.task.findMany({
    where: {
      ownerId: user?.id,
      NOT: {
        status: TASK_STATUS.COMPLETED,
        deleted: false,
      },
    },
    take: 5,
    orderBy: {
      due: "asc",
    },
  });

  return tasks;
};
const TaskCard = async ({ title, tasks, projectId }) => {
  const data = tasks || (await getData());
  console.log(tasks);
  return (
    <Card className="bg-white ml-4">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-3xl text-gray-600">{title}</span>
        </div>
        <div>
          <NewTask projectId={projectId} />
        </div>
      </div>
      <div>
        {data && data.length ? (
          <table className="table-auto w-full">
            <thead className="border-b-2">
              <tr className="w-[100%]">
                <th>Task Name</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Task Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((task) => (
                <tr key={task.id} className="w-full text-center">
                  <td>{task.name}</td>
                  <td>{task.description}</td>
                  <td>{task.due}</td>
                  <td>{task.status}</td>
                  <td>
                    <ClientButtonWrapper id={task.id} endpoint={"deleteTask"} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>You currently have no tasks! Try making some!</div>
        )}
      </div>
    </Card>
  );
};

export default TaskCard;
