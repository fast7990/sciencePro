// 系统管理
import Layout from '@/layout'
const router = {
    path: '/system',
    component: Layout,
    name: '系统设置',
    redirect: '/system/organization',
    meta: {
        title: '系统设置',
        icon: 'xitongguanli'
    },
    children: [
        {
            path: 'organization',
            component: () => import('@/views/system/organization'),
            name: '机构管理',
            meta: { title: '机构管理', icon: 'link', noCache: true }
        },
        {
            path: 'user',
            component: () => import('@/views/system/user'),
            name: '用户管理',
            meta: { title: '用户管理', icon: 'link', noCache: true }
        },
        {
            path: 'param',
            component: () => import('@/views/system/param'),
            name: '参数管理',
            meta: { title: '参数管理', icon: 'link', noCache: true }
        }
    ]
}
export default router