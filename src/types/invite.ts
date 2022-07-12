export interface Invite {
  id: string;
  userId: string;
  teamId: string;
  read: boolean;
  accepted: boolean;
  expiration: string;
  updatedAt: string;
  createdAt: string;
}
