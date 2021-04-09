import { defineComponent, onMounted, ref } from 'vue';
import { Moment } from 'moment';
import { Calendar } from 'ant-design-vue/es';
import '../style/home.scss';
export default defineComponent({
    components: {
        Calendar
    },
    setup() {
        const value = ref<Moment>();
        console.log(value)
        const getListData = (value: any)=> {
            // console.log(value.current.date(), '222')
            let listData
            switch (value.current.date()) {
                case 8:
                    listData = [
                        { type: 'warning', content: '1.' },
                        { type: 'success', content: '2' },
                      ];
                    break;
                case 10:
                    listData = [
                        { type: 'warning', content: '3' },
                        { type: 'success', content: '4' },
                        { type: 'error', content: '5' },
                    ];
                    break;
                case 15:
                    listData = [
                        { type: 'warning', content: 'This is warning event' },
                        { type: 'success', content: 'This is very long usual event。。....' },
                        { type: 'error', content: 'This is error event 1.' },
                        { type: 'error', content: 'This is error event 2.' },
                        { type: 'error', content: 'This is error event 3.' },
                        { type: 'error', content: 'This is error event 4.' },
                    ];
                    break;
                default:
                    break;
            }
            return listData || [];
        }
        const getMonthData = (value: Moment) => {
            if (value.month() === 8) {
                return 1394
            }
        }
        const onPanelChange = (value: Moment) => {
            console.log(value)
            console.log(111)
        }
        onMounted(() => {
        })
        return () => (
            <>
                <div class="home">
                    <a-row>
                        <a-col span={7}>
                            <a-card>
                                <div class="account-center-avatarHolder">
                                    <div class="avatar">
                                        <a-avatar size={104} src={'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'}></a-avatar>
                                    </div>
                                    <div class="username">ZHANG BAO</div>
                                    <div class="bio">海纳百川，有容乃大</div>
                                </div>
                            </a-card>
                        </a-col>
                        <a-col span={16} offset={1}>
                            <a-card>
                                <a-calendar onSelect={onPanelChange} v-model={value.value} v-slots={{dateCellRender:(value:any) => <ul class="events">
                                    {getListData(value).map(item => (
                                        <li>
                                            <a-badge status={item.type} text={item.content}></a-badge>
                                        </li>
                                    ))}
                                </ul>}}>
                                </a-calendar>
                            </a-card>
                        </a-col>
                    </a-row>
                </div>
            </>
        )
    }
})