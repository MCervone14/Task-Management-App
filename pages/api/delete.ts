import { db } from "@/lib/db";

export default async function handler(req, res) {
  const endpoint = req.body.endpoint;
  console.log(endpoint);
  if (endpoint === "deleteProject") {
    await db.project.delete({
      where: {
        id: req.body.id,
      },
    });
  } else {
    await db.task.delete({
      where: {
        id: req.body.id,
      },
    });
  }

  res.json({ data: { message: "ok" } });
}
