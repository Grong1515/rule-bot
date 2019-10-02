import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export default class Rule {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column()
    chat: number;

    @Column({
        default: false
    })
    active: boolean;

}

