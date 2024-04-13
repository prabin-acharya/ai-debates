"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import DebateForm from "@/components/DebateForm";

export default function NewDebate() {
  useEffect(() => {
    const saveDebate = async () => {
      try {
        const response = await axios.post("/api/db/debate", {
          title: "Hello",
        });

        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    saveDebate();
  }, []);

  return (
    <div>
      <DebateForm />
    </div>
  );
}
