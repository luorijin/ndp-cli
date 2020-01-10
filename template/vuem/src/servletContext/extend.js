export default function extend() {
    let length = arguments.length;
    let target = arguments[0] || {};
    if (typeof target!="object" && typeof target != "function") {
        target = {};
        return target;
    }
    if (length == 1) {
        target = this;
        return target;
    }
    for (let i = 1; i < length; i++) { 
        let source = arguments[i];
        Object.keys(source).forEach((key)=>{
            if(target[key]) {
                console.warn(`配置信息"${key}"不生效`)
                return;
            }
            target[key] = source[key]; 
        })
    }
    return target; 
}