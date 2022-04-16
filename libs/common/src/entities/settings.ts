import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Settings {

    @PrimaryGeneratedColumn({type:"bigint"})
    id: number;

    @Column({unique: true})
    name: string;

    @Column({nullable: false})
    value: string;
    
    @Column({nullable: false})
    isEditable: boolean;

    @Column()
    numberValue: number;
}
