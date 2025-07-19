import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Status } from "./statatuses/entities/status.entity";

console.log("debug env", process.env.DATABASE_HOST)
export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    ssl: {
        rejectUnauthorized: false,
    },
    entities: [Status],
    synchronize: true,
});
