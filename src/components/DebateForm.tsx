import axios from "axios";
import React, { useState } from "react";

interface DebateTitleFormProps {
  onSubmitSuccess?: (message: string) => void;
  onSubmitError?: (error: string) => void;
}

const DebateForm: React.FC<DebateTitleFormProps> = ({
  onSubmitSuccess,
  onSubmitError,
}) => {
  const [debateTitle, setDebateTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/addDebates", {
        title: debateTitle,
      });
      if (onSubmitSuccess) {
        onSubmitSuccess("Debate title submitted successfully!");
      }
      console.log(response.data);
    } catch (error) {
      if (onSubmitError) {
        onSubmitError("Failed to submit debate title.");
      }
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label
          htmlFor="debateTitle"
          className="block text-gray-700 font-bold mb-2"
        >
          Debate Title
        </label>
        <input
          type="text"
          id="debateTitle"
          value={debateTitle}
          onChange={(e) => setDebateTitle(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter debate title"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit
      </button>
    </form>
  );
};

export default DebateForm;
