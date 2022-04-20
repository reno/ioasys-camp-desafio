import { IsString, IsNotEmpty } from 'class-validator';
 
export class PasswordRecoverDTO {
  
  @IsString()
  @IsNotEmpty()
  token: string;
}
 