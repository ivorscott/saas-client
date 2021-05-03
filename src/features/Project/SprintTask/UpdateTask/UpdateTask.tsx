// import React, { useState } from "react";
// import { CustomTextInput } from "../../../../shared/fields";
// import { Task } from "../../types";
// import { Modal } from "../../../../shared/components/Modal";
// import { Field, InjectedFormProps } from "redux-form";
// import { Dispatch } from "redux";
// import { reduxForm, SubmissionError } from "redux-form";

// interface Actions {
//   onTaskDelete: () => void;
//   onTaskToggle: () => void;
//   onTaskUpdate: (values: any) => void;
// }

// interface Props extends Actions, InjectedFormProps {
//   open: boolean;
//   task: Task;
// }

// const TaskModal = ({
//   task,
//   open,
//   handleSubmit,
//   onTaskDelete,
//   onTaskToggle,
// }: Props) => {
//   const [showConfirmDialog, setShowConfirmDialog] = useState(false);
//   const toggleConfirmDialog = () => setShowConfirmDialog(!showConfirmDialog);

//   return (
//     <Modal
//       open={open}
//       title={task.title}
//       onClose={onTaskToggle}
//       onSubmit={handleSubmit}
//       callToActionText={"Save"}
//       callToActionColor={"secondary"}
//     >
//       <>
//         <Field
//           name="title"
//           placeholder="Enter a title for this task"
//           component={CustomTextInput}
//         />
//         <div>
//           {!showConfirmDialog ? (
//             <p onClick={toggleConfirmDialog}>Delete Task</p>
//           ) : (
//             <>
//               <p onClick={toggleConfirmDialog}>Cancel</p>
//               <p onClick={onTaskDelete}>Yes, delete it</p>
//             </>
//           )}
//         </div>

//         <br />
//         <p>{task.content}</p>
//       </>
//     </Modal>
//   );
// };
// const submit = (values: any, _: Dispatch, { onTaskUpdate }: any) => {
//   if (!values.title) {
//     throw new SubmissionError({
//       title: "required",
//       _error: "Title Failed",
//     });
//   } else {
//     onTaskUpdate(values);
//   }
// };

// export const UpdateTask = reduxForm({
//   form: "update_task_form",
//   onSubmit: submit,
// })(TaskModal);
export const test = () => {};
