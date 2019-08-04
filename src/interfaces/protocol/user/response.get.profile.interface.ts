export interface UserResponseGetProfileInterface {
    id: number;
    userName: string | null;
    firstName: string;
    lastName: string;
    verified: number;
    sex: number | null;
    bio: string | null;
    avatar: string | null;
    joined: string;
    origin: string | null;
}
