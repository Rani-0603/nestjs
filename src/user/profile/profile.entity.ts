import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user.entity";

/**
 * Profile entity class
 */
@Entity('profile')
export class Profile {

    /**
     * Column id
     */
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * Column imageName
     */
    @Column({ type: 'varchar', name: 'image_name' })
    imageName: string;

    /**
     * Column imageContent
     */
    @Column({ type: 'text', name: 'image_content' })
    imageContent: string;

    /**
     * Relation one to one with user
     */
    @OneToOne(() => User, (user) => user.profile)
    user: User;

}