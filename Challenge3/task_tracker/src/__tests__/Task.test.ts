import { Task, Status } from '../Task'; 

describe('Task Class', () => {
    let task1: Task;

    beforeEach(() => {
        task1 = new Task('Task 1', 'Description 1', Status.Backlog);  
    });

    test('return correct task name', () => {
        expect(task1.getName()).toBe('Task 1');
    });

    test('change task name correctly', () => {
        task1.changeName('Updated Task 1');
        expect(task1.getName()).toBe('Updated Task 1');
    });

    test('return task status', () => {
        expect(task1.getStatus()).toBe(Status.Backlog);
    });

    test('should update task status', () => {
        task1.setStatus(Status.InProgress);
        expect(task1.getStatus()).toBe(Status.InProgress);
    });

    test('should return task description', () => {
        expect(task1.getDescription()).toBe('Description 1');
    });

    test('updates task description correctly', () => {
        task1.setDescription('Updated Description');
        expect(task1.getDescription()).toBe('Updated Description');
    });

});