
const server = 'http://192.168.1.36:8080';                      //company 
// const server = 'http://192.168.31.108:8080';                 //home
// const server = 'http://www.junl.cn';                            //server


// const admin ="http://www.junl.cn/AM/f/yk/api/"                  //serve   
// const admin = 'http://192.168.31.108:8080/AM/f/yk/api/';     //home
const admin = 'http://192.168.1.36:8080/AM/f/yk/api/';          //company
const API = {
  register: admin + 'register.do',                                 //登录注册
  update: admin + 'update.do',                                     //更新用户信息和公司信息
  getOfficeList: admin + 'getOfficeList.do',                       //获取公司部门列表
  login: admin + 'login.do',                                       //二维码登录客户端
  getCompany: admin + 'getCompany.do',                             //获取公司信息
  getUser: admin + 'getUser.do',                                   //获取员工信息
  clockIn: admin + 'clockIn.do',                                   //员工打卡
  unbindUser: admin + 'unbindUser.do',                             //解绑员工
  getRecords: admin + 'getRecords.do',                             //获取打卡记录
  clockInRemind: admin + 'clockInRemind.do',                       //个人打卡提醒设置
  getUserRemind: admin + 'getUserRemind.do',                       //个人打卡提醒查询
  getStatisticalInfo: admin + 'getStatisticalInfo.do',             //所有员工的考勤记录统计
  getAttendanceMachineList: admin + 'getAttendanceMachineList.do', //公司绑定考勤机列表
  addOrUpdateOfficce: admin + 'addOrUpdateOfficce.do',             //添加或修改公司部门信息
  deleteOfficce: admin + 'deleteOfficce.do',                       //删除公司部门信息
  upload: admin + 'upload.do',                                     //图片上传
  announce: admin + 'announce.do',                                 //发布公告
  noticeDetails: admin + 'noticeDetails.do',                       //公告详情
  noticeList: admin + 'noticeList.do',                             //公告列表
  getAttendanceManagement: admin + 'getAttendanceManagement.do',   //获取公司考勤时间配置
  attendanceManagement: admin + 'attendanceManagement.do',         //公司考勤时间设置
  getOfficeUserList: admin + 'getOfficeUserList.do',               //公司每个部门员工
  sendSms: admin + 'sendSms.do',                                   //发送验证码
  rankingList: admin + 'rankingList.do',                           //排行榜
  getTime: admin + 'getTime.do',                                   //连续正常打卡天数
  getSignature: admin + 'getSignature.do',                         //微信签名参数
  getNewNotice: admin + 'getNewNotice.do',                         //获取最新通告
  judge: admin + 'judge.do',                                       //验证考勤机是否被注册
  judgeDevice: admin + 'judgeDevice.do'
};
  
export { admin ,server
}
export default API