// 项目管理
import Layout from '@/layout'
const router = {
    path: '/budget',
    component: Layout,
    redirect: '/budget/index',
    children: [
        {
            path: 'budget/index',
            name: '预算管理',
            component: () => import('@/views/budget/index'),
            meta: { title: '预算管理', icon: 'xiangmuguanli' }
        }
    ]
}
export default router