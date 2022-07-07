export interface Invite {
  id: string;
  userId: string;
  teamId: string;
  teamName: string;
  read: boolean;
  accepted: boolean;
  expiration: string;
  updatedAt: string;
  createdAt: string;
}
