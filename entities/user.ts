import type { AggregateRoot, BaseEntity } from "@/interfaces/aggregate";

export default interface UserBase {
    readonly name: string;
    readonly email: string;
    readonly linkedIn: string;
};

export interface User extends AggregateRoot, UserBase {
    readonly password: string;
    readonly twitter: string;
}

export interface UserEntity extends BaseEntity, Omit<User, 'password'> {}
