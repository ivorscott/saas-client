import React, { useState } from "react";
import { Task } from "../../types";
import { Modal } from "../../../../shared/components/Modal";
import TextField from "@material-ui/core/TextField";

interface Actions {
  onTaskDelete: () => void;
  onTaskToggle: () => void;
  onTaskUpdate: (values: any) => void;
}

interface Props extends Actions {
  open: boolean;
  task: Task;
}

export const UpdateTask = ({
  task,
  open,
  onTaskUpdate,
  onTaskDelete,
  onTaskToggle,
}: Props) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const toggleConfirmDialog = () => setShowConfirmDialog(!showConfirmDialog);

  const handleSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event);
    //   onTaskUpdate()
  };
  return (
    <Modal
      open={open}
      title={task.title}
      onClose={onTaskToggle}
      onSubmit={handleSubmit}
      callToActionText={"Save"}
      callToActionColor={"secondary"}
    >
      <>
        <TextField name="title" placeholder="Enter a title for this task" />
        <div>
          {!showConfirmDialog ? (
            <p onClick={toggleConfirmDialog}>Delete Task</p>
          ) : (
            <>
              <p onClick={toggleConfirmDialog}>Cancel</p>
              <p onClick={onTaskDelete}>Yes, delete it</p>
            </>
          )}
        </div>

        <br />
        <p>{task.content}</p>
      </>
    </Modal>
  );
};
