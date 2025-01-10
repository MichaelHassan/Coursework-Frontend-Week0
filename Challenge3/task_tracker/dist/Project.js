"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
class Project {
    constructor(name) {
        this.id = Project._id++;
        this.name = name;
        this.tasks = [];
    }
    getID() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    changeName(newName) {
        this.name = newName;
    }
    getTasks() {
        return this.tasks;
    }
    addTask(task) {
        this.tasks.push(task);
    }
    removeTask(task) {
        this.tasks.splice(this.tasks.indexOf(task), 1);
    }
    displayProject() {
        console.log('\x1b[36m%s\x1b[0m', `Project ID: ${this.id} - Name: ${this.name} - No.Tasks: ${this.tasks.length} `);
    }
}
exports.Project = Project;
Project._id = 0;
