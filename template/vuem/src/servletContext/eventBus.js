import {isVali} from './utils'
export default class EventBus{
    constructor(){
        this.events = {}
    }
    on(type,fn){
        if(typeof(type)=="string"&&typeof(fn)=="function"){//事件只绑定一次
            if(!isVali(type)) return;
            let ofn = this.events[type];
            if(!ofn) {
                this.events[type] = fn;
            }else{
                console.error(`多次绑定类型${type},只有第一次绑定生效`);
            }
        }else{
            console.error("参数不正确");
        }
    }
    off(type){
        if(type){
            this.events[type] = null;
        }
    }
    emit(type,...args){
        let fn = this.events[type];
        fn&&fn.apply(this,args);
    }
}