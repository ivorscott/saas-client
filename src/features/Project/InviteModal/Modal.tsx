import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Close from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { client as api } from "../../../services/APIService";
import { Params, Project, Team } from "../types";
import { history } from "../../../shared/history";
import md5 from "md5";
import { placeholder } from "../../../shared/components/ImageViewer/placeholder";
import styled from "styled-components";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (emailList: string[]) => void;
}

interface PrettyEmail {
  email: string;
  image: string;
}

export const Modal = ({ open, onClose, onSubmit }: Props) => {
  const [emailList, setEmailList] = useState<string[]>([]);
  const [prettyList, setPrettyEmailList] = useState<PrettyEmail[]>([]);
  const params: Params = useParams();
  const defaultImage =
    "https://devpie-client-local.s3.eu-central-1.amazonaws.com/public/default.png";
  const { data: selected, error } = useQuery<Project, AxiosError>(
    "project",
    async () => await api.get(`/projects/${params.id}`)
  );

  if (error) {
    history.push("/manage/projects");
  }

  const { data: team } = useQuery<Team, AxiosError>(
    "team",
    async () => await api.get(`/users/teams/${selected?.teamId}`)
  );

  useEffect(() => {
    const renderedEmails = prettyList.map((item) => item.email);

    emailList.map(async (email) => {
      const hash = md5(email.trim().toLocaleLowerCase());
      try {
        // fix cors policy so gravatar doesn't fail
        const data = await fetch(
          `https://www.gravatar.com/avatar/${hash}?d=${encodeURI(defaultImage)}`
        );
        console.log(data);
        if (!renderedEmails.includes(email)) {
          setPrettyEmailList([...prettyList, { email, image: data.url }]);
        }
      } catch (e) {
        if (!renderedEmails.includes(email)) {
          setPrettyEmailList([...prettyList, { email, image: placeholder }]);
        }
      }
    });
  }, [emailList]);

  const keyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      console.log("value", event.target.value);
      if (!emailList.includes(event.target.value)) {
        setEmailList([...emailList, event.target.value]);
      }
      event.target.value = "";
    }
  };

  const removeEmail = (email: string) => {
    const newEmailList = emailList.filter((item) => item !== email);
    const newPrettyList = prettyList.filter((item) => item.email !== email);
    setEmailList(newEmailList);
    setPrettyEmailList(newPrettyList);
  };

  const handleSubmit = () => {
    onSubmit(emailList);
  };

  const renderPrettyEmails = () => {
    return (
      <PrettyList>
        {prettyList.map((item) => (
          <li key={item.email}>
            <aside>
              <img src={item.image} />
              <span>{item.email}</span>
            </aside>
            <Close
              className="close"
              fontSize="small"
              onClick={() => removeEmail(item.email)}
            />
          </li>
        ))}
      </PrettyList>
    );
  };
  return (
    <StyleDialog
      data-test="component-projects-modal"
      open={open}
      classes={{ paper: "modal" }}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogContainer>
        <StyledDialogTitle id="responsive-dialog-title">
          Invite Teammates
        </StyledDialogTitle>
        <DialogContentText>
          New members will join {team?.name}.
        </DialogContentText>
        <DialogContent>
          <Field
            fullWidth={true}
            onKeyDown={keyPress}
            placeholder="Enter email address"
          />
          {renderPrettyEmails()}
        </DialogContent>
        <StyledDialogActions>
          <Button className="opt-out" variant="contained" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit} color="primary">
            Invite
          </Button>
        </StyledDialogActions>
      </DialogContainer>
    </StyleDialog>
  );
};

const StyleDialog = styled(Dialog)`
  .modal {
    border-radius: var(--p8);
    max-height: none;
    position: fixed;
    top: 15%;
  }
`;
const DialogContainer = styled.div`
  width: var(--p384);
  padding: var(--p32);
`;

const DialogContent = styled.div`
  min-height: var(--p192);
`;

const StyledDialogTitle = styled(DialogTitle)`
  padding: 0 0 var(--p32);
  h2 {
    font-family: ProximaNova-Bold;
    font-size: var(--p24);
  }
`;

const Field = styled(TextField)`
  background: var(--secondary);
  border-radius: var(--p4);
  border: 1px solid var(--gray2);
  & fieldset {
    border: none;
  }
  & input {
    font-family: ProximaNova-Regular;
    font-size: var(--p16);
    padding: var(--p8);
  }
  & input:focus {
    outline: none;
    border: none;
    background: var(--white1);
    border-radius: var(--p4);
  }
`;

const StyledDialogActions = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: var(--p32);
  button {
    width: 48%;
    padding: var(--p8);
    font-family: ProximaNova-Bold;
    font-size: var(--p16);
    text-transform: capitalize;
  }
  .opt-out {
    color: var(--gray4);
    background: var(--gray1);
    &:hover {
      color: var(--gray9);
      background: var(--gray2);
    }
  }
`;

const PrettyList = styled.ul`
  list-style: none;
  padding: var(--p24) 0 0;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--p8);
  }
  li aside {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  li img {
    width: var(--p32);
    height: var(--p32);
    border-radius: 50px;
  }
  li span {
    justify-self: flex-start;
    color: var(--gray4);
    margin-left: var(--p16);
  }
  li .close {
    color: var(--gray5);
    cursor: pointer;
  }
`;
