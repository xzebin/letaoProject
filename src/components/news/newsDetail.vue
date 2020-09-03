<template>
    <div id="newDetailBox">
        <div class="top">

        </div>
        <div class="bottomDiv">
            <h3>{{ newsDetail.title }}</h3>
            <div class="subtitle">
                <span>发布时间：{{ newsDetail.add_time | formatDate }}</span>
                <span>阅读 {{ newsDetail.click }}次</span>
            </div>
            <div class="content" v-html="newsDetail.content">
                
            </div>
            <div class="comment">
                <Field
                    v-model="message"
                    rows="2"
                    autosize
                    type="textarea"
                    maxlength="50"
                    placeholder="请输入有爱的评论，说点好听的"
                    show-word-limit
                />
                <Button type="info" @click="submitComments" block>评论</Button>
            </div>
            <List
                v-model="loading"
                :finished="finished"
                finished-text="数据都被你划光了哦"
                @load="onLoad"
                >
                <div class="list">
                    <div class="list-item" v-for="item in commentLists" :key="item.id">
                        <div>{{ item.user_name }}：{{ item.content }}</div>
                        <div>评论时间：{{ item.add_time | formatDate }}</div>
                    </div>
                </div>
            </List>
        </div>
    </div>
</template>

<script>
    import { getNewsDetailByNewsId,getNewsCommentByNewsId,addCommentByNewsId } from "@/api/index.js";
    import { Field,Button,Toast,List  } from 'vant';
    export default {
        data(){
            return {
                message:"",         //保存评论内容
                newsDetail:{},       //保存新闻详情数据
                currentNewsId:"",       //保存当前新闻id
                pageindex:1,            //保存当前的页码数
                commentLists:[],        //保存当前评论数据
                loading: false,         //监听加载更多新闻评论
                finished: false,        //监听评论加载完成
            }
        },
        components:{
            Field,Button,Toast,List
        },
        methods: {
            async getNewsById(){    //根据id获取新闻对象
                let res = await getNewsDetailByNewsId(this.currentNewsId);
                this.newsDetail = res[0];
            },
            async getNewsCommentById(){     //根据新闻id获取对应新闻评论
                let res = await getNewsCommentByNewsId(this.currentNewsId,this.pageindex);
                this.pageindex ++;
                setTimeout(() => {
                    if(res.length == 0){
                        this.finished = true;
                        return ;
                    }
                    this.commentLists = this.commentLists.concat(res);
                    // 加载状态结束
                    this.loading = false;
                }, 1500);
            },
            async submitComments(){
                if(this.message.trim() == ""){
                    Toast("评论不能为空");
                    return;
                }
                let inputComment = this.message;
                let res = await addCommentByNewsId({"content":inputComment},this.currentNewsId);
                if(res.status == 0){
                    Toast(res.message);
                    this.message = "";
                    let newO = {"user_name":"匿名用户","content":inputComment,"add_time":new Date()};
                    this.commentLists.push(newO);
                    this.commentLists = this.commentLists.reverse();
                    this.getNewsById();
                }else{
                    Toast("添加失败");
                }
            },
            onLoad() {
                this.getNewsCommentById();
            },
        },
        created() {
            this.currentNewsId = this.$route.params.newsId;
            this.$parent.updBoolAndTitle(false,"新闻详情");
            this.$parent.active = 0;
            this.getNewsById();
        },
    }
</script>

<style lang="scss" scoped>
    #newDetailBox{
        display: flex;
        flex-wrap: wrap;
        // padding-bottom: 50px;
        width: 100%;
        height: 100%;
        background-color: rgb(250, 249, 249);
        .top{
            width: 100%;
            height: 30px;
            background-color: #ccc;
        }
        .bottomDiv{
            flex: 1;
            margin: 0 16px;
            width: 90%;
            h3{
                color: #404040;
                font-size: 16px;
                text-align: center;
            }
            .subtitle{
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #888;
                padding-bottom: 7px;
                span{
                    font-size: 13px;
                    color: #888888;
                }
            }
        }
        /deep/ .content{
              p{
                img{
                    width: 100%;
                }
            }
        }
        .comment {
            .van-button {
                margin-top: 15px;
                width: 100%;
            }
        }
        .list {
            .list-item{
                font-size: 12px;
                background-color: rgb(232, 232, 232);
                margin-top: 10px;
            }
        }
        .van-button--block{
            margin-top: 10px;
        }
    }
</style>