"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskTracker = void 0;
const Project_1 = require("./Project");
const Task_1 = require("./Task");
const Task_2 = require("./Task");
const FileHandler_1 = require("./FileHandler");
const readline_1 = __importDefault(require("readline"));
class TaskTracker {
    constructor() {
        this.rl = readline_1.default.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        this.fileHandler = new FileHandler_1.FileHandler();
        try {
            this.projects = this.fileHandler.readJSON();
            console.log('\x1b[36m%s\x1b[0m', "Saved Projects:");
            this.display();
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("Failed to load saved projects:", error.message);
            }
            else {
                console.error("An unknown error occurred.");
            }
            this.projects = [];
        }
    }
    menu() {
        console.log("\n///////////////////////////////////////");
        console.log("Press '1' to create a project!\nPress '2' to delete a project!\nPress '3' to List current projects!");
        console.log("Press '4' to list tasks for a specific project!");
        console.log("Press '5' to add a task!\nPress '6' to delete a task!");
        console.log("Press '7' to update the status of a task!\nENTER 'QUIT' to exit!");
        console.log("///////////////////////////////////////");
    }
    askQuestion(question) {
        return new Promise((resolve) => this.rl.question(question, resolve));
    }
    display() {
        if (this.projects.length > 0) {
            this.projects.forEach(project => project.displayProject());
        }
        else {
            console.log("NO CURRENT PROJECTS");
        }
    }
    getProjectById(projectID) {
        const project = this.projects.find(project => project.getID() === Number(projectID));
        if (!project)
            console.log(`No project found with ID: ${projectID}`);
        return project || null;
    }
    getTaskById(project, taskID) {
        const task = project.getTasks().find(task => task.getID() === Number(taskID));
        if (!task)
            console.log(`No task found with ID: ${taskID}`);
        return task || null;
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            let isRunning = true;
            while (isRunning) {
                this.menu();
                const answer = yield this.askQuestion('\nEnter: ');
                switch (answer) {
                    case "1":
                        yield this.createProject();
                        break;
                    case "2":
                        yield this.deleteProject();
                        break;
                    case "3":
                        this.display();
                        break;
                    case "4":
                        yield this.getTasks();
                        break;
                    case "5":
                        yield this.addTask();
                        break;
                    case "6":
                        yield this.removeTask();
                        break;
                    case "7":
                        yield this.updateStatus();
                        break;
                    case "QUIT":
                        console.log('\x1b[36m%s\x1b[0m', "Exiting program...");
                        isRunning = false;
                        this.fileHandler.writeJSON(this.projects);
                        break;
                    default:
                        console.log('\x1b[36m%s\x1b[0m', "Invalid Input, please try again.");
                }
            }
            this.rl.close();
        });
    }
    createProject() {
        return __awaiter(this, void 0, void 0, function* () {
            const projectName = yield this.askQuestion('\nWhat is the name of your project? ');
            if (this.projects.find(project => project.getName() === projectName)) {
                console.log(`A project with the name "${projectName}" already exists.`);
            }
            else {
                this.projects.push(new Project_1.Project(projectName));
                console.log(`Created project with name: ${projectName}`);
                this.display();
            }
        });
    }
    deleteProject() {
        return __awaiter(this, void 0, void 0, function* () {
            const projectID = yield this.askQuestion('\nWhat is the ID of the project you want to delete? ');
            let project = this.getProjectById(projectID);
            if (project) {
                this.projects.splice(this.projects.indexOf(project), 1);
                console.log(`Project '${projectID}' has been deleted.`);
                this.display();
            }
        });
    }
    getTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            const projectID = yield this.askQuestion('\nWhat is the ID of the project? ');
            let project = this.getProjectById(projectID);
            if (project) {
                let tasks = project.getTasks();
                if (tasks.length > 0) {
                    tasks.forEach(task => task.displayTask());
                }
                else {
                    console.log("There are no current tasks.");
                }
            }
        });
    }
    addTask() {
        return __awaiter(this, void 0, void 0, function* () {
            const projectID = yield this.askQuestion('\nWhat is the ID of the project: ');
            let project = this.getProjectById(projectID);
            if (project) {
                const name = yield this.askQuestion('\nWhat is the name of the task: ');
                if (project.getTasks().some(task => task.getName() === name)) {
                    console.log(`A task with the name "${name}" already exists in this project.`);
                }
                else {
                    const taskDescription = yield this.askQuestion('\nDescribe the Task: ');
                    yield this.setProjectStatus(project, name, taskDescription);
                }
            }
        });
    }
    setProjectStatus(project_1, name_1) {
        return __awaiter(this, arguments, void 0, function* (project, name, description = "") {
            const status = yield this.askQuestion('\nWhat is the current status of the task: ');
            if (Object.values(Task_2.Status).includes(status)) {
                let task = project.getTasks().find((task) => task.getName() === name);
                if (task) {
                    task.setStatus(status);
                }
                else {
                    project.addTask(new Task_1.Task(name, description, status));
                    project.getTasks().forEach(task => task.displayTask());
                }
            }
            else {
                console.log("Invalid Status. Choose from: Backlog, In Progress, QA, Done");
                yield this.setProjectStatus(project, name, description);
            }
        });
    }
    removeTask() {
        return __awaiter(this, void 0, void 0, function* () {
            const projectID = yield this.askQuestion('\nWhat is the ID of the project: ');
            let project = this.getProjectById(projectID);
            if (project) {
                project.getTasks().forEach(task => task.displayTask());
                const taskID = yield this.askQuestion('\nWhat is the ID of the task you want to remove: ');
                let task = this.getTaskById(project, taskID);
                if (task) {
                    project.removeTask(task);
                    console.log(`Task ${projectID} removed`);
                }
            }
        });
    }
    updateStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            const projectID = yield this.askQuestion('What is the ID of the project: ');
            let project = this.getProjectById(projectID);
            if (project) {
                project.getTasks().forEach(task => task.displayTask());
                const taskID = yield this.askQuestion('What is the ID of the task you want to update: ');
                let task = this.getTaskById(project, taskID);
                if (task) {
                    yield this.setProjectStatus(project, task.getName());
                    task.displayTask();
                }
            }
        });
    }
}
exports.TaskTracker = TaskTracker;
