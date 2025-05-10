import { AbstractEntity } from 'src/common/entities/abstract-entity.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { EventTypesEnum } from './event-types.enum';
import { Account } from 'src/accounts/entities/account.entity';

@Entity()
export class Event extends AbstractEntity {
  @Column()
  type: EventTypesEnum;

  @ManyToOne(() => Account, { eager: true, onDelete: 'CASCADE' })
  origin?: Account | null;

  @ManyToOne(() => Account, { eager: true, onDelete: 'CASCADE' })
  destination?: Account | null;

  @Column('double precision')
  amount: number;
}
