export const createStepCounter = ()=>{
    let step = 1;
    return (name:string)=> `Step ${step++}: ${name}`;
}