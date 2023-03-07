"use client";
import { createNewTask } from "@/lib/api";
import { TASK_STATUS } from "@prisma/client";
import { useState, useTransition } from "react";
import Modal from "react-modal";
import Button from "./Button";
import Input from "./Input";
import { useRouter } from "next/navigation";
import GreetingsSkeleton from "./GreetingsSkeleton";

Modal.setAppElement("#modal");

const NewTask = ({ projectId }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  const isMutating = isFetching || isPending;

  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [due, setDue] = useState(new Date().toDateString());
  const [status, setStatus] = useState<TASK_STATUS | string>(
    TASK_STATUS.NOT_STARTED
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFetching(true);
    await createNewTask(name, description, due, status, projectId);
    closeModal();
    setIsFetching(false);

    startTransition(() => {
      <GreetingsSkeleton />;
      router.refresh();
    });
  };

  return (
    <div className="px-6 py-8 hover:scale-105 transition-all ease-in-out duration-200 flex justify-center items-center">
      <Button onClick={() => openModal()} intent="primary">
        + New Task
      </Button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
        className="w-1/2 flex flex-col items-center bg-white rounded-xl p-8"
      >
        <h1 className="text-3xl mb-6">New Task</h1>
        <form
          className="flex flex-col items-center"
          onSubmit={handleSubmit}
          style={{ opacity: !isMutating ? 1 : 0.7 }}
        >
          <label>Task Name</label>
          <Input
            className="bg-white"
            placeholder="Task Name"
            value={name}
            disabled={isPending}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Task Description</label>
          <Input
            className="bg-white"
            placeholder="Description"
            value={description}
            disabled={isPending}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label>Due Date</label>
          <Input
            className="bg-white"
            placeholder="Due Date"
            type="date"
            value={due}
            disabled={isPending}
            onChange={(e) => setDue(e.target.value)}
          />
          <label>Status</label>
          <select onChange={(e) => setStatus(e.target.value)} value={status}>
            <option value={TASK_STATUS.NOT_STARTED}>Not Started</option>
            <option value={TASK_STATUS.STARTED}>Started</option>
            <option value={TASK_STATUS.COMPLETED}>Completed</option>
          </select>
          <Button type="submit" intent="secondary" className="ml-3">
            Create
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default NewTask;
