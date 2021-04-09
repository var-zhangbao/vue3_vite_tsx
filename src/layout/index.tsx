import { computed, defineComponent, onMounted, ref } from 'vue'
import {Layout, message} from 'ant-design-vue'
import { RouterView } from 'vue-router'
import Header from './components/header'
import Logo from './components/logo'
import '../style/layout.scss'
export default defineComponent({
    components: {
        Layout,
        Header,
        Logo
    },
    setup() {
        let collapsed = ref<boolean>(true)
        onMounted(() => {
        //   console.log(collapsed, '11')
        })
        const getData = (val: any) => {
          collapsed.value =val
        }
        return () => (
            <>
                <a-layout class="layout">
                    <a-layout-sider collapsed={collapsed.value} trigger={null} collapsible class="layout-sider">
                        <Logo collapsed={collapsed.value}></Logo>
                    </a-layout-sider>
                    <a-layout>
                        <a-layout-header style={{'position': 'sticky', 'zIndex': 1, 'width': '100%'}}>
                            <Header collapsed={collapsed.value} onLoad={getData}></Header>
                        </a-layout-header>
                        <a-layout-content class="layout-content">
                            <RouterView></RouterView>
                        </a-layout-content>
                        <a-layout-footer>VUE_VITE ©2021 Created by ZHANG BAO</a-layout-footer>
                    </a-layout>
                </a-layout>
            </>
        )
    }
})