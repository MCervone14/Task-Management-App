"use client";
import React from "react";
import { Trash2 } from "react-feather";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { deleteAction } from "@/lib/api";

const ClientButtonWrapper = ({ id, endpoint }) => {
  const router = useRouter();
  return (
    <Button
      className="float-right text-red-600"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        deleteAction(id, endpoint);
        router.refresh();
      }}
    >
      <Trash2 />
    </Button>
  );
};

export default ClientButtonWrapper;
