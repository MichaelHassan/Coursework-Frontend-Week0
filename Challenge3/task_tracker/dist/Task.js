"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = exports.Status = void 0;
var Status;
(function (Status) {
    Status["Backlog"] = "Backlog";
    Status["InProgress"] = "In Progress";
    Status["QA"] = "QA";
    Status["Done"] = "Done";
})(Status || (exports.Status = Status = {}));
class Task {
    constructor(name, description, status) {
        this.id = Task._id++;
        this.name = name;
        this.status = status;
        this.description = description;
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
    setStatus(newStatus) {
        this.status = newStatus;
    }
    getStatus() {
        return this.status;
    }
    setDescription(newDescription) {
        this.description = newDescription;
    }
    getDescription() {
        return this.description;
    }
    displayTask() {
        console.log('\x1b[36m%s\x1b[0m', this);
    }
}
exports.Task = Task;
Task._id = 0;
