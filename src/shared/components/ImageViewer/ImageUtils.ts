/**
 * https://stackoverflow.com/a/32490603
 *
 * @param imageFile The image file to inspect
 * @param onRotationFound callback when the rotation is discovered. Will return 0 if if it fails, otherwise 0, 90, 180, or 270
 */

export default function getOrientation(
  imageFile: File,
  onRotationFound: (rotationInDegrees: number) => void
) {
  const reader = new FileReader();
  reader.onload = (event: ProgressEvent) => {
    if (!event.target) {
      return;
    }

    const innerFile = event.target as FileReader;
    const view = new DataView(innerFile.result as ArrayBuffer);

    if (view.getUint16(0, false) !== 0xffd8) {
      return onRotationFound(-2);
    }

    const length = view.byteLength;
    let offset = 2;

    while (offset < length) {
      if (view.getUint16(offset + 2, false) <= 8) {
        return onRotationFound(-1);
      }
      const marker = view.getUint16(offset, false);
      offset += 2;

      if (marker === 0xffe1) {
        if (view.getUint32((offset += 2), false) !== 0x45786966) {
          return onRotationFound(-1);
        }

        const little = view.getUint16((offset += 6), false) === 0x4949;
        offset += view.getUint32(offset + 4, little);
        const tags = view.getUint16(offset, little);
        offset += 2;
        for (let i = 0; i < tags; i++) {
          if (view.getUint16(offset + i * 12, little) === 0x0112) {
            return onRotationFound(view.getUint16(offset + i * 12 + 8, little));
          }
        }
        // tslint:disable-next-line:no-bitwise
      } else if ((marker & 0xff00) !== 0xff00) {
        break;
      } else {
        offset += view.getUint16(offset, false);
      }
    }
    return onRotationFound(-1);
  };
  reader.readAsArrayBuffer(imageFile);
}

/**
 * Based off snippet here: https://github.com/mosch/react-avatar-editor/issues/123#issuecomment-354896008
 * @param rotation converts the int into a degrees rotation.
 */
export function convertRotationToDegrees(rotation: number): number {
  let rotationInDegrees = 0;
  switch (rotation) {
    case 8:
      rotationInDegrees = 270;
      break;
    case 6:
      rotationInDegrees = 90;
      break;
    case 3:
      rotationInDegrees = 180;
      break;
    default:
      rotationInDegrees = 0;
  }
  return rotationInDegrees;
}
