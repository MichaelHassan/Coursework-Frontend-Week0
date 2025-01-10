
import { Task } from './Task'; 


export class Project {

    private id    : number     ;
    private name  : string     ;
    private tasks : Task[]     ; 

    private static  _id : number = 0 

    constructor(name: string){
        this.id = Project._id ++ ; 
        this.name = name   ;
        this.tasks =  []   ;
    }

    getID():number{
        return this.id 
    }
    
    getName():string{
        return this.name 
    }

    changeName(newName:string):void{
        this.name = newName ;
    }

    getTasks():Task[]{
        return this.tasks 
    }

    addTask(task : Task):void{
        this.tasks.push(task) ;
    }

    removeTask(task : Task):void{
        this.tasks.splice(this.tasks.indexOf(task),1) ;
    }

    displayProject() {
        console.log('\x1b[36m%s\x1b[0m',
            `Project ID: ${this.id} - Name: ${this.name} - No.Tasks: ${this.tasks.length} `);
    }

}