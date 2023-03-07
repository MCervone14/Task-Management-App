import { FC } from "react";
import { Prisma } from "@prisma/client";
import Card from "./Card";
import clsx from "clsx";
import Button from "./Button";
import { Trash2 } from "react-feather";
import ClientButtonWrapper from "./ClientButtonWrapper";

const projectWithTasks = Prisma.validator<Prisma.ProjectArgs>()({
  include: { tasks: true },
});

type ProjectWithTasks = Prisma.ProjectGetPayload<typeof projectWithTasks>;

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const ProjectCard: FC<{ project: ProjectWithTasks }> = ({ project }) => {
  const completedCount = project.tasks.filter(
    (task) => task.status === "COMPLETED"
  ).length;
  const progress = Math.ceil((completedCount / project.tasks.length) * 100);

  return (
    <Card className="ml-5 px-6 py-8 hover:scale-105 transition-all ease-in-out duration-200 bg-white">
      <div>
        <span className="text-sm text-blue-300">
          {formatDate(project.createdAt)}
        </span>
        <span>
          <ClientButtonWrapper id={project.id} endpoint={"deleteProject"} />
        </span>
      </div>
      <div className="mb-6">
        <span className="text-3xl text-blue-600">{project.name}</span>
      </div>
      <div className="mb-2">
        <span className="text-blue-400">
          {completedCount}/{project.tasks.length} completed
        </span>
        <span className="text-sm text-blue-600 font-semibold float-right">
          {progress}%
        </span>
      </div>
      <div>
        <div className="w-full h-2 bg-blue-900 rounded-full mb-2">
          <div
            className={clsx(
              "h-full text-center text-xs text-white bg-blue-800 rounded-full"
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
