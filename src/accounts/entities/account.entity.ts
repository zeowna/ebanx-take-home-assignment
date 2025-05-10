import { AbstractEntity } from 'src/common/entities/abstract-entity.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Account extends AbstractEntity {
  @Column()
  name: string;

  /**
   * CPF
   */
  @Column()
  nationalRegister: string;

  constructor(id?: number) {
    super();
    if (id) {
      this.id = id;
    }
  }
}
