
import { Project } from '../Project';
import { Task } from '../Task';
import { Status } from '../Task';


describe('Project Class Tests', () => {
    let project: Project;

    beforeEach(() => {
        project = new Project('Test Project');
    });

    test('should create a project with given name', () => {
        expect(project.getName()).toBe('Test Project');
    });

    test('should add tasks to the project', () => {
        let task1 = new Task('Task 1', 'Description 1', Status.Backlog);
        let task2 = new Task('Task 2', 'Description 2', Status.InProgress);
        
        project.addTask(task1);
        project.addTask(task2);

        let tasks = project.getTasks();
        expect(tasks.length).toBe(2);
        expect(tasks).toContain(task1);
        expect(tasks).toContain(task2);
    });

    test('remove tasks correctly', () => {
        let task1 = new Task('Task 1', 'Description 1', Status.Backlog);
        let task2 = new Task('Task 2', 'Description 2', Status.InProgress);
        
        project.addTask(task1);
        project.addTask(task2);
        
        project.removeTask(task1);

        let tasks = project.getTasks();
        expect(tasks.length).toBe(1);
        expect(tasks).not.toContain(task1);
        expect(tasks).toContain(task2);
    });

    test('update project name', () => {
        project.changeName('New Project Name');
        expect(project.getName()).toBe('New Project Name');
    });

});

 