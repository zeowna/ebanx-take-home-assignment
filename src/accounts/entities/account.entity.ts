import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../common/entities/abstract-entity.entity';

@Entity()
export class Account extends AbstractEntity {
  @Column()
  name: string;

  /**
   * CPF
   */
  @Column()
  nationalRegister: string;

  @Column({ type: 'double precision', default: 0 })
  negativeLimit: number;

  constructor(id?: number) {
    super();
    if (id) {
      this.id = id;
    }
  }
}
