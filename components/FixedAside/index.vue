
<template>
  <div class="fixed-aside-container">
      <ul class="fixed-aside-nav">
          <li @click="showRobot">
              <span class="icon">&#xe604;</span>
              <span class="text">在线答疑</span>
          </li>
          <li @click="showForm">
              <span class="icon">&#xe602;</span>
              <span class="text">人工客服</span>
            </li>
          <li @click="jump">
              <span class="icon">&#xe661;</span>
              <span class="text">联系我们</span>
          </li>
      </ul>
        <span class="icon phone-aside-icon" @click="showForm">&#xe607;</span>
      <div class="robot-box">
          <div class="robot-title">
              <span class="text">英国留学指南</span>
              <span class="icon" @click="hideRobot">&#xe622;</span>
          </div>
          <div class="robot-content-box">
            <div class="talks-item robot">
                <img src="/data/img/mini-logo.jpg" alt="" class="headImg">
                <div class="content">
                    <p>您好，请问有什么可以帮助您的呢？</p>
                    <p>院校相关问题 请回复1</p>
                    <p>政策相关问题 请回复2</p>
                    <p>签证相关问题 请回复3</p>
                    <p>其他问题，请转制<span class="icon">&#xe733;</span><nuxt-link to="/contact">人工客服</nuxt-link></p>
                </div>
            </div>
            <div v-if="talksArr.length != 0">
                <template v-for="(item) in talksArr">
                    <div class="talks-item person" :key="'person-'+ item.date">
                        <img src="/data/img/mini-logo.jpg" alt="" class="headImg">
                        <div class="content">{{item.content}}</div>
                    </div>
                    <div class="talks-item robot" :key="'robot-' + item.date">
                    <img src="/data/img/mini-logo.jpg" alt="" class="headImg">
                    <div class="content">
                        <p>您好，您的问题我们已经收到了呢。请在下方输入您的联系方式，我们将在第一时间安排专业的老师给您详细解答。</p>
                        <form class="contact-form" @submit.prevent="submitForm(item.form)" ref="form">
                            <label>
                                <span class="key">姓名</span>
                                <div class="input-box">
                                <input type="text" v-model="item.form.name" autocomplete="off" name="username">
                                </div>
                                
                            </label>
                            <label>
                                <span class="key">手机号</span>
                                <div class="input-box">
                                <input type="text" v-model="item.form.phoneNumbers" autocomplete="off" name="phone">
                                <button :class="{'btn': true, 'disabled-btn': item.form.isCodeIng}" type="button" @click.stop="getAuthCode(form)" :disabled="item.form.isCodeIng">
                                    <span>{{item.codeTxt}}</span>
                                </button>
                                </div>

                            </label>
                            <label>
                                <span class="key">验证码</span>
                                <div class="input-box">
                                <input type="text" v-model="item.form.code" autocomplete="off" name="code">
                                </div>
                            </label>
                            <button type="submit" class="submit-btn">确认提交</button>
                            
                        </form>
                    </div>
                    </div>
                    
                </template>
            </div>
            
          </div>
          <a-textarea :value="content" :maxLength="150" :autoSize="{ minRows: 3, maxRows: 3 }" allowClear @change="changeContent"></a-textarea>
          <div class="btn-box">
              <button class="cancel-btn">
                  <span>取消</span>
              </button>
              <button class="confirm-btn" @click="addTalks">
                  <span>发送</span>
                  <span class="icon">&#xe615;</span>
              </button>
          </div>
      </div>
      <div class="form-wrapper">
          <div class="form-container">
              <span class="close-icon icon" @click.stop="hideForm">&#xe622;</span>
              <h5 class="form-title">
                  <p>请您留下联系方式</p>
                  <p>我们将会在第一时间联系您</p>
              </h5>
              <form class="contact-form" @submit.prevent="submitForm(form)">
                <label>
                    <span class="key">姓名</span>
                    <div class="input-box">
                    <input type="text" name="username" autocomplete="off" v-model="form.name">
                    </div>
                    
                </label>
                <label>
                    <span class="key">手机号</span>
                    <div class="input-box">
                    <input type="text" name="phone" autocomplete="off" v-model="form.phoneNumbers">
                    <button :class="{'btn': true, 'disabled-btn': form.isCodeIng}" type="button" @click.prevent="getAuthCode(form)" :disabled="form.isCodeIng">
                        <span>{{form.codeTxt}}</span>
                    </button>
                    </div>

                </label>
                <label>
                    <span class="key">验证码</span>
                    <div class="input-box">
                    <input type="text" name="code" autocomplete="off" v-model="form.code">
                    </div>
                </label>
                <button type="submit" class="submit-btn">确认提交</button>
                
              </form>
              <p class="sub">您可以关注微信公众号<span class="big">【英国留学指南】</span>获取英国留学指南更全面的信息。</p>
          </div>
      </div>

  </div>
</template>

<script>
import {sendMessage,sendMail,verification} from '~/api/sms'
export default {
    data() {
        return {
            // 人工客服表单
            form: {
                name: '',
                phoneNumbers: '',
                code: '',
                isCodeIng:false,//是否倒计时
                codeTxt:'获取验证码',
            },
            
            content: '', //输入的内容
            talksArr: []
        }
    },
    methods: {
        /**
         * 显示在线答疑窗口
         * @param {*}
         * @return {*}
         */
        showRobot() {
            this.$nextTick(() => {
                $('.fixed-aside-container .robot-box').css({
                    display: 'block'
                }).animate({
                    left: 220,
                    opacity: 1
                })
            });
            
        },
        // 隐藏在线答疑窗口
        hideRobot() {
            this.$nextTick(() => {
                $('.fixed-aside-container .robot-box').animate({
                    opacity: 0,
                    left: 200
                }).css({
                    display: 'none'
                })
            })
            this.clearTalks();
        },
        // 显示人工客服窗口
        showForm() {
            this.$nextTick(() => {
                $('.fixed-aside-container .form-wrapper').css({
                    display: 'block'
                }).animate({
                    opacity: 1
                },350)
            });
            this.hideRobot();
        },
        // 隐藏人工客服窗口
        hideForm() {
            this.$nextTick(() => {
                $('.fixed-aside-container .form-wrapper').animate({
                    opacity: 1
                },350).css({
                    display: 'none'
                })
            })

            this.resetForm(this.form);
        },
        // 跳转至 联系我们 页面
        jump() {
            this.hideRobot();
            this.hideForm();
            this.$router.push('/contact');
        },
        // 修改输入内容
        changeContent(e) {
            this.content = e.target.value;
        },
        //添加对话
        addTalks() {
            if (this.content == '' || this.content.trim().length == 0) {
                this.$message.warn({content: '发送内容不能为空'})
            }

            let arr = [
                {
                    role: 'person',
                    content: this.content,
                    date: new Date().getTime(),
                    form: {
                        name: '',
                        phoneNumbers: '',
                        code: ''
                    },
                    codeTxt: '获取验证码'
                }
            ]
            this.talksArr = this.talksArr.concat(arr);
            this.content = '';
        },
        // 清空对话
        clearTalks() {
            this.content = '';
            this.talksArr = [];
        },
        //获取验证码
        getAuthCode(form) {
            const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
            // 验证用户是否输入手机号
            if (form.phoneNumbers.length != 11 || !reg.test(form.phoneNumbers)) {
                this.$message.error('请输入11位正确格式的手机号码');
                return false;
            }
            let key = 'updated';
            this.countdown(form);
            this.$message.loading({content: '正在发送验证码......',key,duration: 0});

            //发送信息
            sendMessage({phoneNumbers: form.phoneNumbers},this.$axios)
                .then(res => {
                let code = res.data.code;

                if (code == 1) {
                    this.$message.success({content: '发送成功',key,duration: 2});
                } else if (code == 2) {
                    this.$message.error({content: res.data.msg,key,duration: 2});
                } 
                
                })
                .catch(err => {
                    this.$message.error({content: '验证码发送失败！请稍后再试！',key,duration: 2});
                })
        },
        countdown(form) {
            if(!form.isCodeIng){
                //获取验证码倒计时
                form.isCodeIng = true;
                form.time = 60;
                form.timer = setInterval(()=> {
                form.time--;
                form.codeTxt = '重新获取'+ form.time + 's';
                if (form.time <= 0) {
                    form.codeTxt = '获取验证码';
                    form.isCodeIng = false;
                    clearInterval(form.timer);
                }
                }, 1000);
            }
        },
        validate(form) {
            const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (form.name == '' || form.name.trim().length == 0) {
                this.$message.error('请输入姓名');
                return false;
            } else if (form.phoneNumbers == '') {
                this.$message.error('请输入手机号码');
                return false;
            } else if (form.phoneNumbers.length != 11 || !reg.test(form.phoneNumbers)) {
                this.$message.error('请输入11位正确格式的手机号码');
                return false;
            } else if (form.code == '') {
                this.$message.error('请输入验证码');
                return false;
            }
            return true;
        },
        async submitForm(form) {
            if (!this.validate(form)) {
                return false;
            }

            let key = 'updated';
            
            this.$message.loading({content: '提交中......',key,duration: 0});

            try {
                //判断验证码是否有效
                const verRes = await verification({phoneNumbers: form.phoneNumbers,code: form.code},this.$axios);
                
                if (verRes.data.code == 1) {
                // 发送邮件
                const mailRes = await sendMail({name: form.name,phoneNumbers: form.phoneNumbers},this.$axios);
                
                // 判断邮件是否发送成功
                if (mailRes.data.OPSucess) {

                    this.resetForm(form);
                    this.$message.success({content: '感谢您的信任，我们将在第一时间与您联络',key,duration: 2});
                    
                } else {

                    this.$message.error({content: '提交失败，请刷新页面重试',key,duration: 2});

                }

                } else {
                    this.$message.error({content: '验证码已失效，请重新获取',key,duration: 2});
                }
            } catch (error) {

                this.resetForm(form);
                this.$message.error({content: '错误，请稍后再试！',key,duration: 2});
                
            }
        },
        resetForm(form) {
            form.name = '';
            form.code = '';
            form.phoneNumbers = '';
        }
        
    }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style> 