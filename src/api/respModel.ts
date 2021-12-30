export interface WorkOrderTypeConstruction {

    /**
     * 单个一级表单分类名
     */
    Display: string

    /**
     * 分类底下的工单类型信息
     */
    Items: Array<WOTCSubItem>

    /**
     * 分类列表
     */
    CategoryList: Array<WOTCSubItem>

    /**
     * 前端自定义字段
     */
    name?: string
    item?: Array<WOTCSubItem>
    /**
     * 前端自定义字段 判断是否折叠
     */
    flag?: boolean
}

export type WorkOrderForm = Array<WorkOrderFormItem>
interface WorkOrderFormItem {

    /**
     * 表单项Id
     */
    FieldId: number

    /**
     * 表单项名称
     */
    Name: string

    /**
     * 表单项默认值
     */
    DefaultValue: string

    /**
     * 表单项是否必填
     */
    IsRequired: number

    /**
     * 表单项排序值
     */
    Order: number

    /**
     * 表单项类型
     * FieldType 1-7 分别为 单行输入框 单选框 多选框 下拉框 多行输入框  6文件-已弃用 7富文本编辑器
     * 当FieldType为 2 3 4 单选框 多选框 下拉框  时 展示时  多个值在DefaultValue指定 以符号 '|'区分每个选择项 
     */
    FieldType: number

    /**
     * 表单项备注
     */
    Remark?: string

    /**
     * 表单项所属分类
     */
    CategoryId: number

    /**
     * false为表单项是发起表单 true为表单项是交付表单
     */
    IsSubmit: boolean

    // 前端自定义属性
    componentKey?: any,
    componentType?: any // 组件类型
    componentContent?: Array<{ name: string, value: string }>// 针对复选
    componentPlaceholder?: string,// placeholder
    componentValue?: any // 这里会有很多种情况  输入框是直接的值 复选框是数组 单选是boolen 下拉框是index
}
export interface WOTCSubItem {
    /**
     * 工单类型Id
     */
    CategoryId: string

    /**
     * 工单类型名
     */
    FormName: string

    /**
     * 前端自定义字段
     */
    name: string
    /**
     * 工单类型描述
     */
    FormDescription: string

    /**
     * 工单类型备注
     */
    FormRemark: string

    /**
     * 工单类型优先级
     */
    Priority: number

    /**
     * 类型分类下的排序值
     */
    FormOrder: string

    /**
     * 类型所属分类
     */
    Category: string

    /**
     * false为不公开 true为公开
     */
    IsPermit: boolean
    /**
     * 限制发起人
     */
    LimitStaffList: Array<{ CN: string, StaffCode: string }>
}

export interface WorkOrderList {

    /**
     * 工单列表
     */
    WorkOrderList: Array<WorkOrder>
    /**
     * 总数
     */
    TotalCount: string
}

export type WorkOrder = {
    /**
     * 工单ID
     */
    Id: number

    /**
     * 工单标题
     */
    Title: string

    /**
     * 工单类型
     */
    Category: string

    /**
     * 创建日期
     */
    CreatedDate: string

    /**
     * 发起人姓名
     */
    SubStaffName: string

    /**
     * 发起人工号
     */
    SubStaffCode: string

    /**
     * 最新更新时间
     */
    LastUpdated: string

    /**
     * 工单状态
     */
    Status: number

    /**
     * 工单评分
     */
    Rate: number

    /**
     * 当前处理人姓名
     */
    StaffName: string

    /**
     * 当前处理人工号
     */
    StaffCode: string

    /**
     * 优先级 1-3
     */
    Priority: number

    /**
     * 填写的发起表单项JSON数据
     */
    Details: string

    /**
     * 附件路径，多个以'，'英文逗号区分 创建工单使用
     */
    Attachments: string
    /**
     * 附件路径，多个以'，'英文逗号区分 工单详情使用
     */
    Attachment: string

    FromFieldsValue: Array<FromField>
}

type FromField = {
    /**
     * 标题
     */
    Name: string
    /**
     * 是否必填
     */
    IsRequired: number
    /**
     * 类型
     */
    Type: number
    /**
     * 内容
     */
    Value: string
}
export interface WorkOrderDetails {

    /**
     * 工单列表
     */
    ProgressList: Array<Progress>
    /**
     * 总数
     */
    TicketInfo: WorkOrder
}

export type Progress = {
    /**
     * 所属工单Id，对应TicketInfo的Id
     */
    TicketId: number

    /**
     * 操作人姓名
     */
    Operator: string

    /**
     * 流程内容
     */
    Content: string

    /**
     * 创建日期
     */
    CreatedDate: string

    /**
     * 流程类型
     */
    ProgressType: string

    /**
     * 挂钩的模板Id，默认为0
     */
    Template: number

    /**
     * 附件路径，多个以'，'英文逗号区分
     */
    Attachment: string

}
