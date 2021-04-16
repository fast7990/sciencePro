// 项目管理
import Layout from '@/layout'
const router = {
    path: '/project',
    component: Layout,
    redirect: '/project/index',
    children: [
        {
            path: 'project/index',
            name: '项目管理',
            component: () => import('@/views/project/index'),
            meta: { title: '项目管理', icon: 'xiangmuguanli' }
        }
    ]
}
export default router