import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Logs {
    @PrimaryGeneratedColumn({type:"bigint"})
    id: number;

}
