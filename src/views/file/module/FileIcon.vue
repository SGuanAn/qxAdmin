<template>
    <div class="file-icon" :class="[type]"></div>
</template>

<script>
export default {
    props: {
        type: {
            validator: function(value){
                return ['default', 'folder', 'pdf', 'compress_file', "web","png","jpg",
                    'video', 'audio', 'picture', 'doc', 'txt', 'torrent', 'ppt',
                    'code'].indexOf(value) !== -1
            }
        }
    }
}
</script>


<style ref="stylesheet/scss" lang="scss" scoped>
.file-icon {
    display: inline-block;
    background-image: url(../../../assets/images/file_icons.png);
    background-repeat: no-repeat;
    width: 26px;
    height: 23px;
}
.default{
    background-position: -596px -566px;
}
.folder{
    background-position: -594px -862px;
}
.pdf{
    background-position: -596px -136px;
}
.compress_file{
    background-position: -596px -1664px;
}
.video{
    background-position: -596px -1630px;
}
.audio{
    background-position: -596px -442px;
}
.picture{
    background-position: -596px -306px;
}
.doc {
    background-position: -596px -170px;
}
.txt {
    background-position: -596px -102px;
}
.ppt {
    background-position: -596px -204px;
}
.torrent {
    background-position: -596px 0px;
}
.web{
    background-position: -594px -1458px;
}
.code {
    background-position: -596px -1424px;
}
.png {
    background-position: -594px -1458px;
}
.jpg {
    background-position: -594px -1458px;
}
.gif {
    background-position: -594px -1458px;
}
</style>