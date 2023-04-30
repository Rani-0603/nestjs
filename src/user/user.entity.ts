import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile/profile.entity";
import { Role } from "./role";
/**
 * User entity class
 */
@Entity('user')
export class User {
    /**
     * Column Id
     */
    @PrimaryGeneratedColumn()
    Id: number;

    /**
     * Column first name
     */
    @Column({ type: 'varchar', name: 'first_name' })
    firstName: string;

    /**
     * Column last name
     */
    @Column({ type: 'varchar', name: 'last_name' })
    lastName: string;

    /**
     * Column email Id
     */
    @Column({ type: 'varchar', name: 'email_id' })
    emailId: string;

    @Column({ type: 'enum', name: 'role', default: Role.User, enum: Role })
    role: Role;

    @Column()
    password: string;

    /**
     * Column profileid to referance
     */
    @OneToOne(() => Profile, (profile) => profile.user, {
        cascade: true,
        eager: true,
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })

    @JoinColumn()
    profile: Profile;
    static role: any;
}