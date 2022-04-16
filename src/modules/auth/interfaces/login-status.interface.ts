import { User } from '@shared/entities/user/user.entity';
export interface LoginStatus {
    user: User;
    accessToken: any;
    expiresIn: any;
}