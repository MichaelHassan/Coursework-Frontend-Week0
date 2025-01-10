"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileHandler = void 0;
const fs = __importStar(require("fs"));
const Project_1 = require("./Project");
const Task_1 = require("./Task");
class FileHandler {
    writeJSON(projects) {
        fs.writeFileSync('data/projects.json', JSON.stringify(projects, null, 2));
        console.log("Projects have been exported to projects.json.");
    }
    readJSON() {
        let projects = [];
        try {
            const rawData = fs.readFileSync('data/projects.json', 'utf-8');
            let jsonProjects = JSON.parse(rawData);
            jsonProjects.forEach((project) => {
                let realProject = new Project_1.Project(project.name);
                project.tasks.forEach((task) => {
                    realProject.addTask(new Task_1.Task(task.name, task.description, task.status));
                });
                projects.push(realProject);
            });
        }
        catch (error) {
            console.error("Error reading JSON file:", error.message);
            return [];
        }
        return projects;
    }
}
exports.FileHandler = FileHandler;
