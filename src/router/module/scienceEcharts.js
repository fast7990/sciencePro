// 项目管理
import Layout from '@/layout'
const router = {
    path: '/science',
    component: Layout,
    redirect: '/science/index',
    children: [
        {
            path: 'science/index',
            name: '项目管理',
            component: () => import('@/views/science/index'),
            meta: { title: '科技视图', icon: 'shituguanli' }
        }
    ]
}
export default router