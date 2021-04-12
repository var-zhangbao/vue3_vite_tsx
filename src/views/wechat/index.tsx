import { defineComponent, onMounted, ref } from 'vue'
import '../../style/chat.scss'
import { getUserList } from '@/api/login'
export default defineComponent({
    setup() {
        
        const userList = (): any[] => {
            let user: any[] = []
            getUserList({
                name: 'admin'
            }).then(res => {
                user = res.userlist
            })
            console.log(user, '00000')
            return user
        }
        // console.log(user,'3333')
        let flag = ref<number>(-1)
        const currentUser = (index:number) => {
          flag.value =  index
        }
        onMounted(() => {
            console.log(userList(), '999')
            
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
                                    // userList.map((item, index) => (
                                    //     <li onClick={() => currentUser(index)} class={[{'active': flag.value === index}, 'friends']}>{`好友${index+1}`}</li>
                                    // ))
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