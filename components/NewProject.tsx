"use client";
import { createNewProject } from "@/lib/api";
import { useState, useTransition } from "react";
import Modal from "react-modal";
import Button from "./Button";
import Input from "./Input";
import { useRouter } from "next/navigation";
import GreetingsSkeleton from "./GreetingsSkeleton";

Modal.setAppElement("#modal");

const NewProject = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  const isMutating = isFetching || isPending;

  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFetching(true);
    await createNewProject(name);
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
        + New Project
      </Button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
        className="w-3/4 bg-white rounded-xl p-8"
      >
        <h1 className="text-3xl mb-6">New Project</h1>
        <form
          className="flex items-center"
          onSubmit={handleSubmit}
          style={{ opacity: !isMutating ? 1 : 0.7 }}
        >
          <Input
            className="bg-white"
            placeholder="project name"
            value={name}
            disabled={isPending}
            onChange={(e) => setName(e.target.value)}
          />
          <Button type="submit" intent="secondary" className="ml-3">
            Create
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default NewProject;
