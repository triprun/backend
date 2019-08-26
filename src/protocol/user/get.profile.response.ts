export interface UserGetProfileResponse {
  id: number;
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  verified: number;
  sex: number;
  bio: string | null;
  avatar: string | null;
  joined: string;
  origin: string | null;
  role: number;
}
