import React from "react";
import { MenuItem, TextField } from "@material-ui/core";
import { WrappedFieldProps } from "redux-form";

interface Option {
  label: string | number;
  value: string | number;
}

interface Props {
  options: Option[];
}

class CustomSelectInput extends React.Component<WrappedFieldProps & Props> {
  render() {
    const {
      input,
      options = [],
      meta: { error, touched },
    } = this.props;
    return (
      <TextField
        {...input}
        {...this.props}
        error={!!error && touched}
        helperText={error && touched && error}
      >
        {options.map((option: Option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    );
  }
}

export { CustomSelectInput };
