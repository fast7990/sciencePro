// 合同管理
import Layout from '@/layout'
const router = {
    path: '/contract',
    component: Layout,
    redirect: '/contract/index',
    children: [
        {
            path: 'contract/index',
            name: '合同管理',
            component: () => import('@/views//contract/index'),
            meta: { title: '合同管理', icon: 'dashboard' }
        }
    ]
}
export default router