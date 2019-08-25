export interface UserGetProfileResponse {
    id: number;
    email: string;
    userName: string;
    firstName: string;
    lastName: string;
    verified: number;
    sex: number;
    bdate?: number;
}
