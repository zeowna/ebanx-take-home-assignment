import { Column, Entity, ManyToOne } from 'typeorm';
import { EventTypesEnum } from './event-types.enum';
import { AbstractEntity } from '../../common/entities/abstract-entity.entity';
import { Account } from '../../accounts/entities/account.entity';

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
