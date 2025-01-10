import * as fs from 'fs'
import { Project } from './Project'; 
import { Task } from './Task';

export class FileHandler{

    writeJSON(projects: Project[]): void {
        fs.writeFileSync('data/projects.json', JSON.stringify(projects, null, 2) );
        console.log("Projects have been exported to projects.json.");
    }

    readJSON():Project[]|[]{
        let projects:Project[] = []
        
        try {
            const rawData = fs.readFileSync('data/projects.json', 'utf-8')
            let jsonProjects = JSON.parse(rawData) ; 
            jsonProjects.forEach((project: any) => {
                let realProject = new Project(project.name);
                project.tasks.forEach((task: any) => {
                    realProject.addTask(new Task(task.name, task.description, task.status));
                });
                projects.push(realProject);
            });
        } catch (error:any) {
            console.error("Error reading JSON file:", error.message);
            return [];
        }

        return projects
    }
}