import request from '@/request'
export default function helloService(vm){
    return{
        setAttr(title){
            vm.title = title
        },
        getHello(params){
            request.getHello(params).then((result)=>{
                
            })
        },
        postHello(data){
            request.postHello(data).then((result)=>{
                console.log(result)
            })
        }
    }
}