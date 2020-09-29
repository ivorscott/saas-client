import React, { useState } from "react";
import { CustomTextInput } from "../../../../shared/fields";
import { Task } from "../../types";
import { Modal } from "../../../../shared/components/Modal";
import { Typography } from "@material-ui/core";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { Field, InjectedFormProps } from "redux-form";
import { Dispatch } from "redux";
import { reduxForm, SubmissionError } from "redux-form";
import { styles } from "./styles";

interface Actions {
  onTaskDelete: () => void;
  onTaskToggle: () => void;
  onTaskUpdate: (values: any) => void;
}

interface Props extends Actions, InjectedFormProps, WithStyles<typeof styles> {
  open: boolean;
  task: Task;
}

const TaskModal = ({
  task,
  open,
  handleSubmit,
  onTaskDelete,
  onTaskToggle,
  classes,
}: Props) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const toggleConfirmDialog = () => setShowConfirmDialog(!showConfirmDialog);

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
        <Field
          name="title"
          placeholder="Enter a title for this task"
          component={CustomTextInput}
        />
        <div className={classes.confirmDialog}>
          {!showConfirmDialog ? (
            <Typography
              className={classes.confirmAction}
              onClick={toggleConfirmDialog}
              variant="body1"
            >
              Delete Task
            </Typography>
          ) : (
            <>
              <Typography
                className={classes.confirmAction}
                onClick={toggleConfirmDialog}
                variant="body1"
              >
                Cancel
              </Typography>
              <Typography
                className={classes.confirmAction}
                onClick={onTaskDelete}
                variant="body1"
              >
                Yes, delete it
              </Typography>
            </>
          )}
        </div>

        <br />
        <Typography variant="body1">{task.content}</Typography>
      </>
    </Modal>
  );
};
const submit = (values: any, _: Dispatch, { onTaskUpdate }: any) => {
  if (!values.title) {
    throw new SubmissionError({
      title: "required",
      _error: "Title Failed",
    });
  } else {
    onTaskUpdate(values);
  }
};

export const UpdateTask = reduxForm({
  form: "update_task_form",
  onSubmit: submit,
})(withStyles(styles)(TaskModal));
