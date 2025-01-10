"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Project_1 = require("../Project");
const Task_1 = require("../Task");
const Task_2 = require("../Task");
describe('Project Class Tests', () => {
    let project;
    beforeEach(() => {
        project = new Project_1.Project('Test Project');
    });
    test('should create a project with an ID and name', () => {
        expect(project.getName()).toBe('Test Project');
    });
    test('should add tasks to the project', () => {
        const task1 = new Task_1.Task('Task 1', 'Description 1', Task_2.Status.Backlog);
        const task2 = new Task_1.Task('Task 2', 'Description 2', Task_2.Status.InProgress);
        project.addTask(task1);
        project.addTask(task2);
        const tasks = project.getTasks();
        expect(tasks.length).toBe(2);
        expect(tasks).toContain(task1);
        expect(tasks).toContain(task2);
    });
    test('should remove tasks from the project', () => {
        const task1 = new Task_1.Task('Task 1', 'Description 1', Task_2.Status.Backlog);
        const task2 = new Task_1.Task('Task 2', 'Description 2', Task_2.Status.InProgress);
        project.addTask(task1);
        project.addTask(task2);
        project.removeTask(task1);
        const tasks = project.getTasks();
        expect(tasks.length).toBe(1);
        expect(tasks).not.toContain(task1);
        expect(tasks).toContain(task2);
    });
    test('should change the project name', () => {
        project.changeName('New Project Name');
        expect(project.getName()).toBe('New Project Name');
    });
});
