"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Task_1 = require("../Task");
describe('Task Class', () => {
    let task1;
    beforeEach(() => {
        task1 = new Task_1.Task('Task 1', 'Description 1', Task_1.Status.Backlog);
    });
    test('should create a task with a unique id', () => {
        expect(task1.getID()).toBe(0);
        const task2 = new Task_1.Task('Task 2', 'Description 2', Task_1.Status.InProgress);
        expect(task2.getID()).toBe(1);
    });
    test('should return task name', () => {
        expect(task1.getName()).toBe('Task 1');
    });
    test('should change task name', () => {
        task1.changeName('Updated Task 1');
        expect(task1.getName()).toBe('Updated Task 1');
    });
    test('should return task status', () => {
        expect(task1.getStatus()).toBe(Task_1.Status.Backlog);
    });
    test('should update task status', () => {
        task1.setStatus(Task_1.Status.InProgress);
        expect(task1.getStatus()).toBe(Task_1.Status.InProgress);
    });
    test('should return task description', () => {
        expect(task1.getDescription()).toBe('Description 1');
    });
    test('should update task description', () => {
        task1.setDescription('Updated Description');
        expect(task1.getDescription()).toBe('Updated Description');
    });
});
