// TODO: Write code to define and export the Employee classc

class Employee{
    constructor(name, id){
        this.name = name;
        this.id = id;

    }
    
    getName(){
        return this.name
    }
}


module.exports = Employee;
