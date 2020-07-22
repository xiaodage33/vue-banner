import service from "../utils/request.js"
//学生Student
export function get_JenkinsAll(data){
    return service.request({
        method:"get",
        url:"/__api__/jks/jksall",
        data,
    })
}
//一个单独接口sousuo
export function get_JenkinsOne(data){
    return service.request({
        method:"post",
        url:"/__api__/jks/jksinfo",
        data,
    })
}
export function get_JenkinsOneHistory(data){
    return service.request({
        method:"post",
        url:"/__api__/jks/jkshis",
        data,
    })
}
export function get_Git(data){
    return service.request({
        method:"post",
        url:"/__api__/jks/getgit",
        data,
    })
}

export function get_Newjks(data){
    return service.request({
        method:"get",
        url:"/__api__/jks/newpro",
        data,
    })
}

export function get_Newbuild(data){
    return service.request({
        method:"post",
        url:"/__api__/jks/newbuild",
        data,
    })
}

// //添加一条数据
// export function addinfo(data){
//     return service.request({
//         method:"post",
//         url:"/__api__/stu/add",
//         data,
//     })
// }
// //del删除
// export function delinfo(data){
//     return service.request({
//         method:"post",
//         url:"/__api__/stu/del",
//         data,
//     })
// }
// //修改学生信息
// export function editinfo(data){
//     return service.request({
//         method:"post",
//         url:"/__api__/stu/edit",
//         data,
//     })
// }
// //公司测试系统后台运维平台
// //获取所有查询所有 traefik的ingress
// export function Getinfo(data){
//     return service.request({
//         method:"get",
//         url:"/__api__/trae/trae",
//         data,
//     })
// }
// export function k8slog(data){
//     return service.request({
//         method:"get",
//         url:"/__api__/k8s/log",   //显示所有pod名字和状态
//         data,
//     })
// }
// export function LogInfo(data){
//     return service.request({
//         method:"post",
//         url:"/__api__/k8s/loginfo",   //显示日志
//         data,
//     })
// }
// export function getError(data){
//     return service.request({
//         method:"get",
//         url:"/__api__/k8s/errorlog",   //显示pod错误数量和名字
//         data,
//     })
// }
// export function getError_file(data){
//     return service.request({
//         method:"get",
//         url:"/__api__/k8s/eroorlogfile",   //显示pod错误数量和名字在文件中查询不是实时那么慢
//         data,
//     })
// }
// export function getTraceId(data){
//     return service.request({
//         method:"post",
//         url:"/__api__/k8s/traceid",   //显示traceId 链路
//         data,
//     })
