export function sleep(time){        //延时函数
    return new Promise((relove,reject)=>{
        setTimeout(function(){
            relove();
        },time);
    })
}