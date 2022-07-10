import React from "react";
import { styled } from "@mui/material/styles";
import { getUserInitials } from "../../helpers";
import { Memberships } from "../../features/Project/types";
import ImageViewer, { ImageViewerProps } from "../ImageViewer";

interface Props {
  alt: ImageViewerProps["alt"];
  size?: ImageViewerProps["size"];
  membership: Memberships | undefined;
  badgeColor?: string;
  classNames?: string;
}

export const Avatar = ({
  membership,
  size,
  alt,
  badgeColor,
  ...props
}: Props) => {
  if (!membership) {
    return null;
  }

  return membership.picture ? (
    <StyledAvatars alt={alt} size={size} url={membership.picture} {...props} />
  ) : (
    <StyledPlaceholders
      className={`badge ${badgeColor} ${size || "md"}`}
      {...props}
    >
      {getUserInitials(membership.firstName, membership.lastName)}
    </StyledPlaceholders>
  );
};

const StyledAvatars = styled(ImageViewer)`
  border-radius: 50%;
  cursor: pointer;
`;

const StyledPlaceholders = styled("div")`
  color: var(--gray7);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  text-align: center;
  font-size: var(--p12);
  margin: 0 var(--p4);
  text-transform: uppercase;
  &.xl {
    height: var(--p192);
    width: var(--p192);
    font-size: var(--p96);
  }
  &.lg {
    height: var(--p96);
    width: var(--p96);
    font-size: var(--p32);
  }
  &.md {
    height: var(--p64);
    width: var(--p64);
    font-size: var(--p24);
  }
  &.sm {
    height: var(--p32);
    width: var(--p32);
    font-size: var(--p12);
  }
`;
