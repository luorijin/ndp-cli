<template>
    <div class="title" @click="ct">{{title}}</div>
</template>

<script>
import HelloService from '@/service/helloService'
let helloService;
export default {
    name:"helloworld",
    data(){
        return {
            title:"你好!"
        }
    },
    created(){
        helloService = HelloService(this);
        helloService.postHello({id:1,luo:2});
    },
    methods:{
        ct(){
            helloService.setAttr("我是大师")
        }
    }
}
</script>

<style lang="less">
    .title{
        position: fixed;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
    }
</style>