<template>
    <div class="file-header">
        <el-row>
            <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
            accept="image/jpeg,image/gif,image/png,text/plain" 
            style="display: inline-block;">
                <el-button type="primary" size="mini" icon="el-icon-upload">上传文件</el-button>
            </el-upload>

            <div style="display: inline-block;">
                <el-button size="mini" icon="el-icon-folder-add" @click="$refs.fileForm.dialog = true">新建文件夹</el-button>
                <eForm ref="fileForm" :is-add="true" />
            </div>
        </el-row>
    </div>
</template>

<script>
import eForm from './form'
export default {
    components: { eForm }
}
</script>

<style lang="sass" scoped>

</style>


