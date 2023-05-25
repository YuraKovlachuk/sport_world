import { AccountType } from '../account.entity';

export interface IPayload {
  id: string;
  email: string;
  phone: string;
  type: AccountType;
}
