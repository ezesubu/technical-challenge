
import {Status} from "./statatuses/entities/status.entity";
import { AppDataSource } from "./data-source";


const statuses = [
    { name: 'Scheduled', order: 1 },
    { name: 'Checked-In', order: 2 },
    { name: 'In Consultation', order: 3 },
    { name: 'Cancelled', order: 4 },
    { name: 'No-Show', order: 5 },
];

async function seed() {
    try {
        await AppDataSource.initialize();
        const repo = AppDataSource.getRepository(Status);

        for (const status of statuses) {
            const exists = await repo.findOne({ where: { name: status.name } });
            if (!exists) {
                const newStatus = repo.create(status);
                await repo.save(newStatus);
                console.log(`Inserted: ${status.name}`);
            } else {
                console.log(`Already exists: ${status.name}`);
            }
        }

        console.log('✅ Seeding completed!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seeding error:', err);
        process.exit(1);
    }
}

seed();
