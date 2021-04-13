import { defineComponent, onMounted, reactive, ref } from 'vue'
import '../../style/chat.scss'
import { getUserList } from '@/api/login'
export default defineComponent({
    setup() {
        let user = reactive<any>([])
        let flag = ref<number>(-1)
        const currentUser = (index:number) => {
          flag.value =  index
        }
        const userList = async () => {
            getUserList({name: 'admin'}).then(res => {
                for (let i =0; i<res.userlist.length; i++) {
                    user.push(res.userlist[i])
                }
            })
            
        }
        userList();
        console.log(user, '222')
        onMounted(() => {
            
            
        })
        return () => (
            <div class="chat">
                <a-row>
                    <a-col span={6}>
                        <div class="user-list">
                            <div class="user-list-search">
                                1111
                            </div>
                            <ul class="user-list-box">
                                {
                                    user.map((item: any, index: number) => (
                                        <li onClick={() => currentUser(index)} class={[{'active': flag.value === index}, 'friends']}>
                                            <div class="portrait">
                                                <img src={item.usericon} alt="" class="img"/>
                                            </div>
                                            <div class="friends-info">
                                                <span>{item.name}</span>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </a-col>
                    <a-col span={12}>
                        <div class="chat-content">
                            <div class="user-title">张三</div>
                        </div>
                    </a-col>
                    <a-col span={6}>3</a-col>
                </a-row>
            </div>
        )
    }
})