export function getOrderNum(){
    let date = new Date();
    let year = date.getFullYear() < 10 ? "0" + date.getFullYear() : date.getFullYear();
    let month = (date.getMonth()+1) < 10 ? "0" + (date.getMonth()+1) : (date.getMonth()+1);
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let result = "";
    for(let i=0;i<12;i++){
        result += Math.floor(Math.random()*10);
    }
    return year+month+day+result;
}