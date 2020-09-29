import React from "react";
import { TextField } from "@material-ui/core";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { WrappedFieldProps } from "redux-form";
import { styles } from "./styles";

interface Props extends WithStyles<typeof styles> {}

const CustomTextInput = withStyles(styles)(
  class TextInput extends React.Component<WrappedFieldProps & Props> {
    render() {
      const {
        classes,
        classes: { filled },
        meta: { error, touched, valid, dirty },
        input,
        ...rest
      } = this.props;

      return (
        <TextField
          {...input}
          {...rest}
          FormHelperTextProps={{
            classes: { filled },
          }}
          error={!!error && touched}
          helperText={
            (error && touched && error) ||
            (valid &&
              dirty &&
              input.name === "username" &&
              "Username is available")
          }
        />
      );
    }
  }
);

export { CustomTextInput };
