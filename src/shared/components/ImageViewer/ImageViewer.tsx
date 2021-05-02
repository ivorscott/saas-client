import React from "react";
import { placeholder } from "./placeholder";
import {
  // isIOS,
  getOrientation,
  convertRotationToDegrees,
} from "./ImageUtils";
import "./animate.css";

interface Props {
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
        if (xhr.response.type === "text/html") {
          reject("");
        }
        resolve({
          response: xhr.response,
          contentType: xhr.getResponseHeader("content-type"),
        });
      };

      xhr.onerror = (e) => {
        reject("");
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
    const { alt } = this.props;

    // look at git to reproduce differently
    return (
      <div>
        <img alt={alt} src={this.state.imageUrl || placeholder} />
      </div>
    );
  }
}

export default ImageViewer;
