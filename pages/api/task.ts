import { validateJWT } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function handler(req, res) {
  const user = await validateJWT(req.cookies["User"]);
  await db.task.create({
    data: {
      name: req.body.name,
      ownerId: user.id,
      projectId: req.body.projectId,
      description: req.body.description,
      due: req.body.due,
      status: req.body.status,
    },
  });

  res.json({ data: { message: "ok" } });
}
