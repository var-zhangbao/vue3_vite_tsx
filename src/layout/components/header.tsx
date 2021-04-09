import { defineComponent, ref, resolveDynamicComponent, resolveComponent, getCurrentInstance, defineAsyncComponent, render, h, onMounted, computed} from 'vue'
import '@/style/header.scss'
import components from "@/layout/components/components";
import {IntrinsicElements} from '@/element'
export default defineComponent({
    props: {
        onLoad: {
            type: Function
        },
        collapsed: {
            type: Boolean
        }
    },
    components: {
        ...components
    },
    setup(props,{emit}) {
        // const { proxy } = getCurrentInstance()
        // console.log(getCurrentInstance())
        // const alertName = proxy.$alertName
        // console.log(alertName)
        // alertName()
        const count = ref(0)
        onMounted(() => {
            console.log(props.collapsed, '11')
        })
        const iconList = [
            {
                icon: 'SearchOutlined',
                tips: '搜索',
            },
            {
                icon: 'GithubOutlined',
                tips: 'github',
            },
            {
                icon: 'SettingOutlined',
                tips: '网站设置',
            },
            {
                icon: 'LockOutlined',
                tips: '锁屏',
            }
        ]
        // const slots = {
        //     title: () => <span>测试</span>
        // }
        const doLogout = () => {
            console.log('退出')
        }
        const handle = () => {
            console.log('点击')
        }
        const CreatComponent = (item:any) => {
             let TODO: IntrinsicElements["AA"] = resolveDynamicComponent(item)
            return <TODO onClick={handle}></TODO>
        }
        const iconEl = () => {
            let iconEl: IntrinsicElements["BB"] = props.collapsed ? resolveDynamicComponent('menu-unfold-outlined') : resolveDynamicComponent('menu-fold-outlined')
            return <iconEl></iconEl>
        }
        const asiderWidth = computed(() => props.collapsed ? '80px' : '190px')
        return () => (
            <>
              <div class="header">
                  <div class="left-options">
                  <span onClick={() => emit('load', !props.collapsed)} class="menu-fold">
                      {iconEl()}
                  </span>
                    
                  </div>
                  <div class="right-options">
                    {iconList.map((item,index) => (
                        <a-tooltip v-slots={{title: () => <span>{item.tips}</span>}}>
                            {CreatComponent(item.icon)}
                        </a-tooltip>
                    ))}
                    <a-dropdown v-slots={{overlay: () => (
                        <a-menu>
                            <a-menu-item>
                                <a href="javascript:;">个人中心</a>
                            </a-menu-item>
                            <a-menu-divider/>
                            <a-menu-item>
                                <a onClick={doLogout}><a/> 退出登录</a>
                            </a-menu-item>
                        </a-menu>
                    )}}>
                        <a-avatar>admin</a-avatar>
                    </a-dropdown>
                  </div>
              </div>
            </>
        )
    }
})