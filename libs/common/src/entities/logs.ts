import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Inventory } from "./inventory";

@Entity()
export class Logs {
    @PrimaryGeneratedColumn({type:"bigint"})
    id: number;

    @ManyToOne(()=> Inventory, {eager:true}) 
    @JoinColumn()
    inventory: Inventory;

    @Column()
    price: number;
    @Column()
    quantity: number;
    @Column()
    amount: number;
    
    @Column()
    totalCoins: number;
    @Column()
    totalCurrency: number;

    @Column()
    consumedCoins: number;
    @Column()
    consumedCurrency: number;

    @Column()
    returnedCoins: number;
    @Column()
    returnedCurrency: number;

    @Column()
    desciption: string;
}
