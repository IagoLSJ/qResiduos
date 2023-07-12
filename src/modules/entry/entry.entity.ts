import { DestinationEntity } from '../destination/destination.entity';
import { ProviderEntity } from '../provider/provider.entity';

export class EntryEntity {
  id: string;
  fornecedor: ProviderEntity;
  destination: DestinationEntity;
  observation: string;
  fileUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
