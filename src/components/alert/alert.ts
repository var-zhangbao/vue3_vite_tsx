import { deflate } from 'zlib'
import alert from './alert'
export default {
    install: (app: any, options: any) => {
        console.log(options)
        app.config.globalProperties.$alertName = (name: any) => {
            console.log(options.name)
        }
    }
}
