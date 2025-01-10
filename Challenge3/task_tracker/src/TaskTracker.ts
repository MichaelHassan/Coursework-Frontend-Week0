import { Project } from './Project'; 
import { Task } from './Task'; 
import { Status } from './Task'; 
import { FileHandler } from './FileHandler'; 

import readline from 'readline'

export class TaskTracker {
    private projects: Project[];
    private rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    private fileHandler: FileHandler

    constructor(){
        this.fileHandler = new FileHandler() ;
        try {
            this.projects = this.fileHandler.readJSON() || []; 
            console.log('\x1b[36m%s\x1b[0m',"Saved Projects:");
            this.display(); 
        } catch (error: unknown) { 
            if (error instanceof Error) { 
                console.error("Failed to load saved projects:", error.message);
            } else {
                console.error("An unknown error occurred.");
            }
            this.projects = [];
        }
    }

    menu():void{
        console.log("\n///////////////////////////////////////")
        console.log("Press '1' to create a project!\nPress '2' to delete a project!\nPress '3' to List current projects!")
        console.log("Press '4' to list tasks for a specific project!")
        console.log("Press '5' to add a task!\nPress '6' to delete a task!")
        console.log("Press '7' to update the status of a task!\nENTER 'QUIT' to exit!") ;
        console.log("///////////////////////////////////////")
    }

    askQuestion(question: string): Promise<string> {
        return new Promise((resolve) => this.rl.question(question, resolve));
    }

    display():void{
        if(this.projects.length > 0){
            this.projects.forEach(project=> project.displayProject());
        }else{
            console.log("NO CURRENT PROJECTS")
        }
    }

    getProjectById(projectID: string): Project | null {
        const project = this.projects.find(project => project.getID() === Number(projectID));
        if (!project) 
            console.log(`No project found with ID: ${projectID}`);
        return project || null;
    }

    getTaskById(project: Project, taskID: string): Task | null {
        const task = project.getTasks().find(task => task.getID() === Number(taskID));
        if (!task) 
            console.log(`No task found with ID: ${taskID}`);
        return task || null;
    }

    async run():Promise<void> {
        let isRunning = true;
        while (isRunning) {
            this.menu();
            const answer = await this.askQuestion('\nEnter: ');
            switch (answer) {
                case "1":
                    await this.createProject();
                    break;
                case "2":
                    await this.deleteProject();
                    break;
                case "3":
                    this.display();
                    break;
                case "4":
                    await this.getTasks();
                    break;
                case "5":
                    await this.addTask();
                    break;
                case "6":
                    await this.removeTask();
                    break;
                case "7":
                    await this.updateStatus();
                    break;
                case "QUIT":
                    console.log('\x1b[36m%s\x1b[0m',"Exiting program...");
                    isRunning = false;
                    this.fileHandler.writeJSON(this.projects)
                    break;
                default:
                    console.log('\x1b[36m%s\x1b[0m',"Invalid Input, please try again.");
            }
        }
        this.rl.close();
    }

    async createProject():Promise<void>{
        const projectName = await this.askQuestion('\nWhat is the name of your project? ');
        if (this.projects.find(project => project.getName() === projectName)) {
            console.log(`A project with the name "${projectName}" already exists.`);
        } else {
            this.projects.push(new Project(projectName));
            console.log(`Created project with name: ${projectName}`);
            this.display();
        }
    } 

    async deleteProject():Promise<void>{
        const projectID = await this.askQuestion('\nWhat is the ID of the project you want to delete? ');
        let project = this.getProjectById(projectID)
        if (project) {
            this.projects.splice(this.projects.indexOf(project),1) ;
            console.log(`Project '${projectID}' has been deleted.`);
            this.display() ;
        }
    } 

    async getTasks():Promise<void>{
        const projectID = await this.askQuestion('\nWhat is the ID of the project? ');
        let project = this.getProjectById(projectID)
        if (project){
            let tasks = project.getTasks()
            if (tasks.length > 0) {
                tasks.forEach(task => task.displayTask());
            }else{
                console.log("There are no current tasks.");
            }
        }
    }

    async addTask():Promise<void>{
        const projectID = await this.askQuestion('\nWhat is the ID of the project: ');
        let project = this.getProjectById(projectID)
        if (project){
            const name = await this.askQuestion('\nWhat is the name of the task: ');
            if (project.getTasks().some(task => task.getName() === name)) {
                console.log(`A task with the name "${name}" already exists in this project.`);
            } else {
                const taskDescription = await this.askQuestion('\nDescribe the Task: ');
                await this.setProjectStatus(project, name, taskDescription)
            }
        }
    } 

    async setProjectStatus(project: Project, name:string, description:string = "" ):Promise<void>{
        const status = await this.askQuestion('\nWhat is the current status of the task: ');
        if(Object.values(Status).includes(status as Status)){
            let task = project.getTasks().find((task) => task.getName() === name)
            if (task){
                task.setStatus(status as Status)
            }else{
                project.addTask(new Task(name,description,status as Status)); 
                project.getTasks().forEach(task => task.displayTask());
            }
        }else {
            console.log("Invalid Status. Choose from: Backlog, In Progress, QA, Done") ;
            await this.setProjectStatus(project, name, description) ;
        }
    }

    async removeTask():Promise<void>{
        const projectID = await this.askQuestion('\nWhat is the ID of the project: ');
        let project = this.getProjectById(projectID)
        if (project){
            project.getTasks().forEach(task => task.displayTask());
            const taskID = await this.askQuestion('\nWhat is the ID of the task you want to remove: ');
            let task = this.getTaskById(project,taskID )
            if (task){
                project.removeTask(task) ; 
                console.log(`Task ${projectID} removed`);
            }
        }
    } 


    async updateStatus():Promise<void>{
        const projectID = await this.askQuestion('What is the ID of the project: ');
        let project = this.getProjectById(projectID)
        if (project){
            project.getTasks().forEach(task => task.displayTask());
            const taskID = await this.askQuestion('What is the ID of the task you want to update: ');
            let task = this.getTaskById(project,taskID )
            if (task){
                await this.setProjectStatus(project,task.getName());
                task.displayTask()
            }
        }
    }
}


