import { defineComponent } from 'vue'
import '../../style/logo.scss'
export default defineComponent({
    props: {
        collapsed: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        return () => (
            <>
                <div class="logo">
                    <img src="/src/assets/logo.png" alt=""/>
                    { props.collapsed ? '' : <h2 class="title">VUE VITE</h2>}
                </div>
            </>
        )
    }
})