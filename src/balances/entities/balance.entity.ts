import { Account } from 'src/accounts/entities/account.entity';
import { AbstractEntity } from 'src/common/entities/abstract-entity.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Balance extends AbstractEntity {
  @ManyToOne(() => Account, { eager: true, onDelete: 'CASCADE' })
  account: Account | null;

  @Column('double precision', {
    default: 0,
  })
  currentBalance: number;
}
