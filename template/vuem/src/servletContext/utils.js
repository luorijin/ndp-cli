export let isVali = function(type){
    if(type.split(":").length>1){
        return true;
    }else{
        console.error(`"${type}"不是正确的格式[source]:[name]`);
        return false;
    }
}