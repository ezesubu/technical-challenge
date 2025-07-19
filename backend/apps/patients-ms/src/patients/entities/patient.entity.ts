import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('patients')
export class Patient {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    full_name: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column({ type: 'uuid' })
    provider_id: string;

    @Column({ type: 'uuid' })
    status_id: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}
