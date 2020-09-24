import classnames from "classnames";
import React from "react";
import { isIOS } from "react-device-detect";
import getOrientation, { convertRotationToDegrees } from "./ImageUtils";
import { withStyles, WithStyles } from "@material-ui/core";
import "./animate.css";
import styles from "./styles";

interface Props extends WithStyles<typeof styles> {
  alt: string;
  url: string;
  className?: any;
}

interface State {
  imageUrl: any;
  rotate: any;
}

class ImageViewer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      imageUrl: null,
      rotate: null,
    };
  }

  componentDidMount() {
    this.handleUrlUpdate(this.props.url);
  }

  componentDidUpdate(prevProps: any) {
    if (prevProps.url !== this.props.url) {
      this.handleUrlUpdate(this.props.url);
    }
  }

  fetchImage = (url: string) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";

    const imagePromise = new Promise((resolve, reject) => {
      xhr.onload = (e) => {
        resolve({
          response: xhr.response,
          contentType: xhr.getResponseHeader("content-type"),
        });
      };

      xhr.onerror = (e) => {
        reject(e);
      };
    });
    xhr.send();
    return imagePromise;
  };

  processImageBuffer = (image: any) => {
    const picture = image.response;
    getOrientation(picture, (rotation) => {
      const degrees = convertRotationToDegrees(rotation);
      this.setState({ rotate: degrees });
    });
    return picture;
  };

  createObjectURL = (picture: Blob) => {
    const urlCreator = window.URL || (window as any).webkitURL;
    const imageUrl = urlCreator.createObjectURL(picture);
    this.setState({ imageUrl });
  };

  handleUrlUpdate(url: string) {
    return this.fetchImage(url)
      .then(this.processImageBuffer)
      .then(this.createObjectURL)
      .catch((e) => {
        console.error(e);
      });
  }

  render() {
    const { alt, className, classes } = this.props;

    let imageClasses = classnames(`${classes.imageStyles} `, {
      [`${className}`]: className,
    });

    if (isIOS) {
      imageClasses = classnames(`${imageClasses}`, {
        [`${classes.autoRotate270}`]: this.state.rotate === 270,
        [`${classes.autoRotate180}`]: this.state.rotate === 180,
        [`${classes.autoRotate90}`]: this.state.rotate === 90,
      });
    }

    return (
      <div className={classes.wrapperStyles}>
        <img
          alt={alt}
          className={`viewer-image ${imageClasses}`}
          src={this.state.imageUrl}
        />
      </div>
    );
  }
}

export default withStyles(styles)(ImageViewer);
