// apps/statuses-ms/src/statuses/entities/status.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

@Entity('statuses')
export class Status {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ type: 'uuid', nullable: true })
    parent_id?: string;

    @ManyToOne(() => Status, { nullable: true })
    @JoinColumn({ name: 'parent_id' })
    parent: Status | null;

    @Column({ type: 'int' })
    order: number;
}
