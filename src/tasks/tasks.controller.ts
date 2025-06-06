import { Controller, Post, Get, Param, Body, Put, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

//Puse mensajes en cada uno de los endpoints para que se vea más claro el funcionamiento y comprobar que sí funcionan correctamente al probarlos en Postman
@UseGuards(JwtAuthGuard) //Este decorador protege todos los endpoints de este controlador, asegurando que solo los usuarios autenticados puedan acceder a ellos. DESARROLLO EJERCICIO 2 - INTERMEDIO.
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Post()
    async create(@Body() body: { titulo: string; userId: number }) {
        const task = await this.tasksService.createTask(body.titulo, body.userId);
        return {
            message: 'Tarea creada exitosamente',
            task,
        };
    }

    @Get()
    async findAll() {
        const tasks = await this.tasksService.findAll();
        return {
            message: 'Tareas obtenidas correctamente',
            count: tasks.length,
            tasks,
        };
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        const task = await this.tasksService.findById(+id);
        return {
            message: 'Tarea encontrada',
            task,
        };
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: Partial<Task>) {
        const updatedTask = await this.tasksService.updateTask(+id, body);
        return {
            message: 'Tarea actualizada correctamente',
            task: updatedTask,
        };
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.tasksService.deleteTask(+id);
        return {
            message: 'Tarea eliminada correctamente',
            id: +id,
        };
    }
}