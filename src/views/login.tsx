
import { defineComponent, onMounted, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router';
import '../style/login.scss'
import { login } from '@/api/login'
interface LOGINFORM {
    userName: string,
    password: any
}
export default defineComponent({
    setup(prop,context) {
        let loginMessage: string = '欢迎您'
        let showlogin: boolean= false
        let loginForm: LOGINFORM = {
            userName: '',
            password: ''
        }
        let userName = ref('') // 响应式操作
        let elList:  any[] = []
        const $router = useRouter()
        onMounted(() => {
            
        })
        const loginbtn = () => {
            // userName.value = loginForm.userName
            // showlogin=true
            login({
                name: 'zhangsan'
            }).then(res => {
                console.log(res)
            })

            // $router.push({
            //     path: '/'
            // })
        }
        const eventLine = () => {
            for(let i = 0 ; i < 16; i++) {
                elList.push(i)
            }
        }
        eventLine()
        return () => (
            <>
                <div class={[{'form-success':showlogin}, 'wrapper']}>
                    <div class="container">
                        <h1>{loginMessage}{userName.value}</h1>
                        <form class="form" v-show={!showlogin} v-model={loginForm}>
                            <input type="text" placeholder="用户名"  v-model={loginForm.userName}/>
                            <input type="password" placeholder="密码"  v-model={loginForm.password} />
                            <button type="button" id="login-button" onClick={loginbtn}>登录</button>
                        </form>
                    </div>
                    <ul class="bg-bubbles">
                        {elList.map((item, index) => (
                            <li></li>
                        ))}
                    </ul>
                </div>
            </>
        )
    }
})