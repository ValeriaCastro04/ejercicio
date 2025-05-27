import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private useRepository: Repository<User>,
    ) { }

    async createUser(nombre: string, email: string): Promise<User> {
        const nuevo = this.useRepository.create({ nombre, email });
        return this.useRepository.save(nuevo);
    }

    async findAll(): Promise<User[]> {
        return this.useRepository.find();
    }

    async findById(id: number): Promise<User> {
        const user = await this.useRepository.findOne({ where: { id } });
        if (!user) {
            throw new Error(`Usuario con ID ${id} no encontrado`);
        }
        return user;
    }

    async updateUser(id: number, data: Partial<User>): Promise<User> {
        const user = await this.findById(id);
        Object.assign(user, data);
        return this.useRepository.save(user);
    }

    async deleteUser(id: number): Promise<void> {
        const result = await this.useRepository.delete(id);
        if (result.affected === 0) {
            throw new Error(`Usuario con ID ${id} no encontrado`);
        }
    }

}
