import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Inventory {

    @PrimaryGeneratedColumn({type:"bigint"})
    id: number;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    initalStock: number;

    @Column({nullable: false})
    price: number;

    @Column({nullable: false})
    currentStock: number;

    @Column({nullable: false})
    isDeleted: boolean;

}

