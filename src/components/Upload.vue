<template>
    <div class="upload_container">
        <div class="upload_caption_container">
            <div class="select_caption">{{ caption }}</div>
            <div v-if="isRequire == true" class="upload_warn">*</div>
        </div>
        <div class="upload_file_item_group">
            <div
                v-for="({ data, pathSuffix, name },key) in componentValue"
                :key="key"
                class="upload_file_item_container"
            >
                <div class="upload_file_item">
                    <div class="upload_file_item_close" @click.stop="deleteFile(key)">×</div>
                    <div class="icon-tag">
                        <svg
                            v-if="!imageFile.includes(pathSuffix)"
                            style="width: 0.6rem;height: 0.6rem;"
                            aria-hidden="true"
                        >
                            <use v-bind:xlink:href="iconMap[pathSuffix]" />
                        </svg>
                        <img
                            v-if="imageFile.includes(pathSuffix)"
                            @click.self="onImagePreview(key)"
                            :src="`data:image/png;base64,${data}`"
                        />
                    </div>
                </div>
                <span>{{ name }}</span>
            </div>
            <div class="upload_file_item" @click="showContent = true">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xinzeng" />
                </svg>
            </div>
        </div>

        <SelectContent
            v-if="showContent"
            :selectionArr="selectionArr"
            :onSelect.sync="fileType"
            :close="close"
            :onItemSelect="onItemSelect"
        ></SelectContent>
    </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Getter, Mutation, State } from 'vuex-class'
import SelectContent from './SelectContent.vue';
@Component({
    components: {
        SelectContent
    }
})
export default class Upload extends Vue {
    @Prop({ default: false }) isRequire!: boolean
    @Prop() caption?: string
    @Prop() placeholder?: string
    @Prop() value?: string
    @Prop() dataKey?: string
    @Prop() onValueChange?: (value: string[], key?: any) => void
    @Prop({ default: 10 }) max!: number

    readonly iconMap = {
        doc: '#icon-WORD',
        docx: '#icon-WORD',
        xls: '#icon-Microsoft-Excel',
        xlsx: '#icon-Microsoft-Excel',
        ppt: '#icon-PPT',
        pptx: '#icon-PPT',
        pdf: '#icon-PDF',
        rar: '#icon-wenjianleixing-biaozhuntu-wenjianjia',
        zip: '#icon-yellowFolder'
    } as any
    readonly allowFile = [
        'jpg', 'gif', 'png',
        'bmp', 'doc', 'docx',
        'xls', 'xlsx', 'ppt',
        'pptx', 'pdf', 'rar',
        'zip'
    ]

    readonly imageFile = [
        'jpg', 'gif', 'png', 'bmp',
    ]
    readonly size = 1024 * 1024 * 10
    readonly selectionArr = [
        {
            name: '图片',
            value: 'pic'
        },
        {
            name: '附件',
            value: 'doc'
        },
    ]
    showContent = false
    fileType = ''
    componentValue = []

    deleteFile(index: number) {
        this.componentValue.splice(index, 1)
    }
    checkFile() {

    }

    async onImagePreview(index: number) {

    }
    async onItemSelect(index: number) {


    }
    close() {
        this.showContent = false
    }

    @Watch('componentValue')
    onComponentValueChange(value: any) {
        this.onValueChange && this.onValueChange(value, this.dataKey)
    }
}
type File = {
    name?: string
    path: string
    size: number
}
</script>
<style scoped>
.upload_warn {
    color: red;
    padding: 0 0.1rem;
}
.upload_caption_container {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0.1rem 0;
}
.upload_file_item_group {
    display: grid;
    justify-items: center;
    justify-content: space-around;
    grid-template-columns: repeat(auto-fill, 0.8rem);
    grid-row-gap: 0.06rem;
    grid-column-gap: 0.1rem;
}
.upload_file_item_container {
    width: 0.8rem;
    height: 1rem;
}
.upload_file_item_container span {
    display: inline-block;
    width: 0.8rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: #a9a8a5;
}
.upload_file_item {
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 0.1rem;
    border: 0.01rem dotted #e2e2e2;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: relative;
}
.upload_file_item img {
    border-radius: 0.1rem;
    width: 0.8rem;
    height: 0.8rem;
}
.icon-tag {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.icon-tag > img {
    border-radius: 0.02rem;
}
.upload_file_item_close {
    position: absolute;
    top: 0;
    right: 0;
    width: 0.2rem;
    height: 0.2rem;
    line-height: 0.2rem;
    background: black;
    color: #fff;
    text-align: center;
    border-top-right-radius: 0.03rem;
    z-index: 600;
}
.upload_container {
    background: #fff;
    padding: 0.1rem;
}
</style>