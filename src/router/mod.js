/**
 * @Project blog
 * @Author Sirpale
 * @Description
 * @Date Created in 2018\5\11 0011 by 21:02
 */

// 首页
export const Home = r => require.ensure([],() => r(require('@/pages/home')),'mod');

// 工具
export const Tool = r => require.ensure([],() => r(require('@/pages/tool')),'mod');

// 留言
export const Message = r => require.ensure([],() => r(require('@/pages/message')),'mod');

// 用户
export const User = r => require.ensure([],() => r(require('@/pages/user/user')),'mod');

// 用户主页
export const UserHome = r => require.ensure([],() => r(require('@/pages/user/home')),'mod');

// 用户文章
export const UserArticle = r => require.ensure([],() => r(require('@/pages/user/article')),'mod');

// 用户收藏
export const UserCollect = r => require.ensure([],() => r(require('@/pages/user/collect')),'mod');

// 用户留言
export const UserMessage = r => require.ensure([],() => r(require('@/pages/user/message')),'mod');

// 用户设置
export const UserSet = r => require.ensure([],() => r(require('@/pages/user/set')),'mod');

// 发表文章
export const SubArticle = r => require.ensure([],() => r(require('@/pages/sub-article')),'mod');

// 文章详情
export const Detail = r => require.ensure([],() => r(require('@/pages/detail')),'mod');
