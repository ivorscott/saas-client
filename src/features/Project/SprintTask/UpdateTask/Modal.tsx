import React from "react";
import { CustomTextInput } from "../../../../shared/fields";

import { Task } from "../../types";
import { Modal } from "../../../../shared/components/Modal";
import styles from "./styles";

import { withStyles, Typography } from "@material-ui/core";
import { Field, InjectedFormProps } from "redux-form";

export interface IProps {
  open: boolean;
  task: Task;
  classes?: any;
  showConfirmDialog: boolean;
  handleSubmit: () => void;
  onTaskDelete: () => void;
  onTaskToggle: () => void;
  onTaskUpdate: (values: any) => void;
}
interface IState {
  showConfirmDialog: boolean;
}

const UpdateTaskModal = withStyles(styles)(
  class Component extends React.Component<IProps & InjectedFormProps, IState> {
    state = {
      showConfirmDialog: false,
    };

    toggleConfirmDialog = () =>
      this.setState((current) => ({
        showConfirmDialog: !current.showConfirmDialog,
      }));

    render() {
      const {
        task,
        open,
        classes,
        handleSubmit,
        onTaskDelete,
        onTaskToggle,
      } = this.props;

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
              {!this.state.showConfirmDialog ? (
                <Typography
                  className={classes.confirmAction}
                  onClick={this.toggleConfirmDialog}
                  variant="body1"
                >
                  Delete Task
                </Typography>
              ) : (
                <>
                  <Typography
                    className={classes.confirmAction}
                    onClick={this.toggleConfirmDialog}
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
    }
  }
);

export { UpdateTaskModal };
