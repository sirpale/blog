/**
 * @Project blog
 * @Author Sirpale
 * @Description url地址管理
 * @Date Created in 2018\4\29 0029 by 13:21
 */


const API = '/api';

export default {
  // 首页 num为文章显示数
  HOME:  `${API}`,

  // 登录提交
  LOGIN: `${API}/login`,

  // 注册
  REG: `${API}/reg`,

  // 登出
  LOGOUT: `${API}/logout`,

  // 获取文章详情
  GET_ARTICLE: `${API}/getArticle`
}
