import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

// interface AppointmentConstructor {
//     provider: string;
//     date: Date;
// }

import User from './User';

@Entity('appointments')
class Appointment {
    /* Dentro do SQL temos alguns tipos de relacionamentos:
     *
     * One to One
     * One to Many - um user possui vários agendamentos
     * Many to Many
     *
     */

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    // eslint-disable-next-line camelcase
    provider_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'provider_id' })
    provider: User;

    @Column('timestamp with time zone')
    date: Date;

    @CreateDateColumn()
    // eslint-disable-next-line camelcase
    created_at: Date;

    @UpdateDateColumn()
    // eslint-disable-next-line camelcase
    updated_at: Date;

    // O typeorm cria o construtor de forma automática
    //
    // constructor({ provider, date }: Omit<Appointment, 'id'>) {
    //     this.id = uuid();
    //     this.provider = provider;
    //     this.date = date;
    // }
}

export default Appointment;
