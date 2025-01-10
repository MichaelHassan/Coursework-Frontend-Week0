
export enum Status {
    Backlog = "Backlog",
    InProgress = "In Progress",
    QA = "QA",
    Done = "Done",
}
export class Task {

    private id: number
    private name: string
    private description: string
    private status: Status

    private static _id: number = 0 ;

    constructor(name: string, description: string, status: Status){

        this.id          = Task._id++     ;
        this.name        = name           ;
        this.status      = status         ;
        this.description =  description   ;
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

    setStatus(newStatus : Status):void{
        this.status = newStatus ;
    }

    getStatus():Status{
        return this.status
    }

    setDescription(newDescription : string):void{
        this.description = newDescription ;
    }

    getDescription():string{
        return this.description
    }

    displayTask() {
        console.log('\x1b[36m%s\x1b[0m',this);
    }

    // toJSON(): object {
    //     return {
    //         id: this.id,
    //         name: this.name,
    //         description:this.description,
    //         status: this.status,
    //         _id:Task._id
    //     };
    // }
}