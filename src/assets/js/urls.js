/**
 * @Project blog
 * @Author Sirpale
 * @Description url地址管理
 * @Date Created in 2018\4\29 0029 by 13:21
 */


const API = '';

export default {
  // 首页 num为文章显示数
  HOME:  `${API}`,

  // 登录提交
  LOGIN: `${API}/login`,

  // 注册
  REG: `${API}/reg`,

  // 登出
  LOGOUT: `${API}/logout`,

  // 提交文章
  SUB_ARTICLE: `${API}/subArticle`,

  // 获取文章列表
  GET_ARTICLE_LIST: `${API}/getArticleList`,

  // 获取文章详情
  GET_ARTICLE: `${API}/getArticle`
}
