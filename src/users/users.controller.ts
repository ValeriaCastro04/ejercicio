import { Controller, Post, Get, Param, Body, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

// Este decorador protege todos los endpoints de este controlador, asegurando que solo los usuarios autenticados puedan acceder a ellos.
// El ejercicio 3 avanzado se desarrolla en este controlador, específicamente en el endpoint DELETE, que permite a un usuario eliminar su propia cuenta, pero no la de otros usuarios.
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
 
    @Post()
    create(@Body() body: { nombre: string; email: string }): Promise<User> {
        return this.usersService.createUser(body.nombre, body.email);
    }
 
    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }
 
    @Get(':id')
    findById(@Param('id') id: string): Promise<User> {
        return this.usersService.findById(+id);
    }
 
    @Put(':id')
    update(@Param('id') id: string, @Body() body: Partial<User>): Promise<User> {
        return this.usersService.updateUser(+id, body);
    }
 
    @Delete(':id') // Este endpoint permite a un usuario eliminar su propia cuenta. No permite eliminar cuentas de otros usuarios. EJERCICIO 3 - AVANZADO
    async delete(@Param('id') id: string, @Req() req): Promise<any> {
        const userId = parseInt(id, 10);

        if (userId !== req.user.userId) {
            throw new ForbiddenException('No puedes eliminar a otro usuario.');
        }

        await this.usersService.deleteUser(userId);
        return {
            message: 'Usuario eliminado correctamente',
            id: userId,
        };
    }

}