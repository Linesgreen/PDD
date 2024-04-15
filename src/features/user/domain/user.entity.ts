import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  static createUser(name: string, surname: string, email: string, passwordHash: string): User {
    const user = new this();

    user.name = name;
    user.surname = surname;
    user.email = email;
    user.password = passwordHash;

    return user;
  }
}
