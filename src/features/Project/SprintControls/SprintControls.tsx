import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, Menu, MenuItem } from "@material-ui/core";
import styles from "./styles";

interface Props {
  classes: any;
  onDeleteProjectClick: () => void;
}

interface State {
  anchorEl: any;
}

export const SprintControls = withStyles(styles)(
  class Controls extends React.Component<Props, State> {
    constructor(props: Props) {
      super(props);
      this.state = {
        anchorEl: null,
      };
    }

    handleClick = (event: React.MouseEvent) => {
      this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
      this.setState({ anchorEl: null });
    };

    render() {
      const { classes, onDeleteProjectClick }: Props = this.props;
      const { anchorEl } = this.state;

      return (
        <ul data-test="component-sprint-controls" className={classes.menu}>
          <li>
            <div>
              <Button
                aria-owns={anchorEl ? "simple-menu" : undefined}
                aria-haspopup="true"
                onClick={this.handleClick}
              >
                Settings
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
              >
                <MenuItem onClick={onDeleteProjectClick}>
                  Delete Project
                </MenuItem>
              </Menu>
            </div>
          </li>
        </ul>
      );
    }
  }
);
