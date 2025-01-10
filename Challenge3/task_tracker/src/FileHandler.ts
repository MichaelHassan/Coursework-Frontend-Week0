import * as fs from 'fs'
import { Project } from './Project'; 

export class FileHandler{

    writeJSON(projects: Project[]): void {
        fs.writeFileSync('data/projects.json', JSON.stringify(projects, null, 2) );
        console.log("Projects have been exported to projects.json.");
    }

    readJSON():Project[]{
        const rawData = fs.readFileSync('data/projects.json', 'utf-8')
        return JSON.parse(rawData)
    }
}