export interface IProfile {
  id: string;
  name: string;
  imageUrl: string | null;
  userId: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
