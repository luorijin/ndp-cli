import $axios from '@/utils/axios'
export default {
    getHello(params){
        return $axios.get("/luo/hello",{params});
    },
    postHello(data){
        return $axios.post("/luo/hello",data);
    }
}