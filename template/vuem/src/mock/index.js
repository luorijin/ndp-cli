import Mock from "mockjs"
function match(str){
    return new RegExp(str);
}
Mock.setup({
    timeout: '2000 - 3000' // 方式二 设置区间
  })

Mock.mock(match("/luo/hello"),(request)=>{
    return  Mock.mock({
        'id':'@id',
        'title':'贵州电网有限责任公司2019年党建工作责任制满意度测评',
        'banner':()=>{
            return require('@/assets/logo.png');
        }
    })
})