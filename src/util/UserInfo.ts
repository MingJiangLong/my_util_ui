
class UserInfo implements I_User {

    constructor() {

    }
    syncInfo() {

    };
    getComponentUseInfo() {
        return []
    };


}


interface I_User {

    /**
     * 同步用户信息
     */
    syncInfo: () => void

    /**
     * 
     */
    getComponentUseInfo: (componentName?: string) => I_ComponentUseInfo[]

}
/**
 * 组件使用信息
 */
interface I_ComponentUseInfo {

    /**
     * 组件名
     */
    componentName: string

    /**
     * 使用次数
     */
    count: number

    /**
     * 上一次使用时间
     */
    lastUseTime?: string
}

/**
 * 用户基本信息
 */
interface UserBaseInfo {
    alias: string
}