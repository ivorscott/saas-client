import { Dispatch } from "redux";
import { reduxForm, SubmissionError } from "redux-form";
import { UpdateTaskModal } from "./Modal";

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
})(UpdateTaskModal);
