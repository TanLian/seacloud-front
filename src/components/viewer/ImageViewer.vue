<template>
    <transition name="fade">
        <div class="media-wrapper" v-if="true">
            <Button type="text" class="media-close" shape="circle" icon="close" @click="close"></Button>
            <div class="media-controller">
                <ButtonGroup shape='circle'>
                    <Button size="large" type="ghost" icon="ios-skipbackward" @click.prevent="prev"></Button>
                    <Button size="large" type="ghost" icon="ios-skipforward" @click.prevent="next"></Button>
                </ButtonGroup>
            </div>
            <div class="media-content">
                <div v-for="(item,index) in data" :key="index" :class="type(index)">
                    <img :src='item' v-if="isImg(item)" @click="toggle(index)">
                    <video :src="item" v-else controls="controls" @click="toggle(index)">
                    </video>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'cjMedia',
    data() {
        return {
            nowIndex: 0,
            data: []
        }
    },
    methods: {
        next() {
            if (this.nowIndex == this.data.length - 1) {
                this.$Message.warning('已到达最后一张');
            } else {
                this.nowIndex++;
            }
        },
        prev() {
            if (this.nowIndex == 0) {
                this.$Message.warning('已到达第一张');
            } else {
                this.nowIndex--;
            }
        },
        type(index) {
            if (index == this.nowIndex) {
                return 'media-center'
            } else if (index - this.nowIndex == 1) {
                return 'media-right'
            } else if (index - this.nowIndex == -1) {
                return 'media-left'
            } else {
                return 'media-hide'
            }
        },
        isImg(item) {
            /*var ext = item.substr(item.length - 3, 3);
            var flag = ext == ('jpg' || 'png' || 'gif') ? true : false;
            return flag;*/
            return true
        },
        toggle(index) {
            if (index - this.nowIndex == 1) {
                this.nowIndex++;
            } else if (index - this.nowIndex == -1) {
                this.nowIndex--;
            }
        },
        close() {
            this.nowIndex = 0;
            this.$router.go(-1)
        },
        getImgList(dirPath) {
          let params = {"path":dirPath}
          this.$api.get('/api/files/get_dir_img_files', params, response => {
            let files = response.files
            for (let index = 0; index < files.length; index++) {
              this.data.push('/api/' + files[index]['url'])
            }
          }, response => {
            if (response.error === "not login") {
              this.$router.push({name: 'Login'})
            }
          })
        }
    },
    mounted() {
      let parent_dir = this.$route.query.dir
      let file_name = this.$route.query.file
      this.getImgList(parent_dir)
    }
}
</script>

<style lang="scss">
.media-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.52);
    z-index: 1010;
    i {
        color: #fff
    }
    .media-controller {
        position: absolute;
        left: 50%;
        bottom: 30px;
        transform: translateX(-50%)
    }
    .media-close {
        position: absolute;
        right: 5px;
        top: 5px;
        i {
            font-size: 30px;
        }
    }
    .media-content {
        div {
            position: absolute;
            top: 50%; // background: green;
            color: #fff;
            text-align: center;
            font-size: 30px;
            transition: all .56s ease;
            img {
                max-width: 100%;
                max-height: 100%
            }
            video {
                width: 100%;
            }
        }
        .media-center {
            height: 50%;
            width: 40%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 1011;
        }
        .media-left,
        .media-right {
            width: 25%;
            height: 35%;
            filter: grayscale(90%);
        }
        .media-right {
            left: 100%;
            transform: translate(-105%, -50%);
        }
        .media-left {
            left: 0;
            transform: translate(5%, -50%);
        }
        .media-hide {
            height: 0;
            width: 0;
            left: 50%;
            z-index: 1010;
            opacity: 0;
        }
    }
}
</style>
