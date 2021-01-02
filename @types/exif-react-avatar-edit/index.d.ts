import * as Avatar from "exif-react-avatar-edit";

declare global {
  namespace Avatar {
    interface Props {
      width: number | string;
    }
  }
}
