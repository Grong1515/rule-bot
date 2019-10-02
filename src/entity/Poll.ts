import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, PrimaryColumn} from "typeorm";
import Rule from "./Rule";

@Entity()
export default class Poll {

    @PrimaryColumn()
    id: string;

    @OneToOne(type => Rule, {
        cascade: true,
        eager: true
    })
    @JoinColumn()
    rule: Rule;

    @Column()
    message: number;

    @Column()
    chat: number;

    @Column()
    members: number;

    @Column({
        default: 0
    })
    yes: number;

    @Column({
        default: 0
    })
    no: number;

}

