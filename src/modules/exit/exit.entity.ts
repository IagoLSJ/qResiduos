import { ExitType } from './enum/exitType';

export class ExitEntity {
  id: string;
  observation: string;
  exitType: ExitType;
  productQuantity: number;
  code: string;
  providerId: string;
  productId: string;
  destinationId: string;
  createdAt: Date;
  updatedAt: Date;
}
