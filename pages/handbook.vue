<template>
  <div class="handle-book-wrapper">
      <section class="banner-area">
          <div class="banner-content">
              <h1 class="website-title">首册《英国教育指南-寄宿学校》来了!</h1>
              <p class="sub-title">包含你最想了解的英国教育信息!</p>
              <button class="btn" @click="openPopup">注册免费领取</button>
          </div>
      </section>
      <section class="desc-area">
          <div class="desc-container">
              <img src="@/assets/image/handlebook-desc.jpeg" alt="" class="pic">
              <div class="content">
                  <p>对很多父母来说，让孩子去国外读书是一个重大的决定，如何让孩子进入心仪学校，这个漫长的过程中会遇到相当多的问题，并没有想象中那么容易。为了解决这一痛点，英国留学指南联合权威合作伙伴于2021年开年首次发布<span class="blue">《2021英国教育指南》</span>。</p>
              </div>
          </div>
      </section>
      <section class="list-area">
          <div class="list-container">
              <div class="title-box">
                  <h6 class="title">《2021英国教育指南》</h6>
                  <p class="desc">包含英国寄宿学校留学资讯与指导建议，主要内容包括:</p>
              </div>
              <ul class="list">
                  <li><img src="@/assets/image/University.png" alt="" class="pic"><span class="text">英国最顶尖寄宿学校总揽</span></li>
                  <li><img src="@/assets/image/Rank.png" alt="" class="pic"><span class="text">寄宿学校排名</span></li>
                  <li><img src="@/assets/image/EducationSystem.png" alt="" class="pic"><span class="text">英国教育系统介绍</span></li>
                  <li><img src="@/assets/image/Exam.png" alt="" class="pic"><span class="text">关于英国考试</span></li>
                  <li><img src="@/assets/image/Steps.png" alt="" class="pic"><span class="text">申请流程介绍</span></li>
                  <li><img src="@/assets/image/FreeServices.png" alt="" class="pic"><span class="text">免费入学服务</span></li>
              </ul>
          </div>
      </section>
      <section class="form-area">
          <div class="form-container">
              <div class="img-box">
                  <img src="@/assets/image/book.png" alt="" class="picture">
              </div>
              
              <div class="form-right">
                  <div class="form-title-box">
                      <img src="@/assets/image/email.svg" alt="" class="ico">
                      <div class="text-box">
                          <p>提交联系信息，</p>
                          <p>即刻下载完整手册</p>
                      </div>
                  </div>
                  <img src="@/assets/image/book.png" alt="" class="pic">
                  <form @submit.prevent="submitForm" class="form">
                      <label>
                          <input type="text" class="inp" autocomplete="off" placeholder="您的电话号码" v-model="form.phoneNumbers" />
                      </label>
                      
                      <label class="code-label">
                          <input type="text" class="code-inp" autocomplete="off" placeholder="验证码" v-model="form.code">
                          <button type="button" :class="{'code-btn': true, 'disabled': isCodeIng, 'isNull': isNull }" :disabled="isCodeIng" @click.stop="getAuthCode">{{codeTxt}}</button>
                      </label>
                      <button type="submit" class="btn" v-if="!isSuccess">立即领取《2021英国教育指南》</button>
                      <a href="/data/handlebook.pdf" class="aBtn btn" v-else download="2021英国教育指南.pdf" @click="resetForm">点我下载</a>
                  </form>
              </div>
          </div>
      </section>
      <Popup ref="popup"/>
  </div>
</template>

<script>
import {sendMessage,verification, sendMail} from '~/api/sms'
export default {
    data() {
        return {
            form: {
                phoneNumbers: '',
                code: '',
                name: '匿名用户'
            },
            isCodeIng:false,//是否倒计时
            codeTxt:'发送验证码',
            isNull: true,
            isSuccess: false
        }
    },
    watch: {
        
        form: {
            handler: function (newValue) {
                if (newValue.phoneNumbers == '') {
                    this.isNull = true;
                } else {
                    this.isNull = false;
                }
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        openPopup() {
            this.$refs.popup.openPopup();
        },
        //获取验证码
        getAuthCode() {
            const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (this.form.phoneNumbers.length != 11 || !reg.test(this.form.phoneNumbers)) {
                this.$message.error('请输入11位正确格式的手机号码');
                return false;
            }
            let key = 'updated';
            this.countdown();
            this.$message.loading({content: '正在发送验证码......',key,duration: 0});

            // 发送验证码
            sendMessage({phoneNumbers: this.form.phoneNumbers},this.$axios).then(res => {
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
        countdown() {
            if(!this.isCodeIng){
                //获取验证码倒计时
                this.isCodeIng = true;
                let time = 60;
                let timer = setInterval(()=> {
                time--;
                this.codeTxt = '重新获取'+ time + 's';
                if (time <= 0) {
                    this.codeTxt = '发送验证码';
                    this.isCodeIng = false;
                    clearInterval(timer);
                }
                }, 1000);
            }
        },
        validate() {
            const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (this.form.phoneNumbers == '') {
                this.$message.error('请输入手机号码');
                return false;
            } else if (this.form.phoneNumbers.length != 11 || !reg.test(this.form.phoneNumbers)) {
                this.$message.error('请输入11位正确格式的手机号码');
                return false;
            } else if (this.form.code == '') {
                this.$message.error('请输入验证码');
                return false;
            }
            return true;
        },
        async submitForm() {

            if (!this.validate()) {
                return false;
            }
            let key = 'updated';

            this.$message.loading({content: '提交中......',key,duration: 0});

            try {
                
                //判断验证码是否有效
                const verRes = await verification({phoneNumbers: this.form.phoneNumbers,code: this.form.code},this.$axios);
                
                if (verRes.data.code == 1) {
                    // 发送邮件
                    const mailRes = await sendMail({name: this.form.name,phoneNumbers: this.form.phoneNumbers},this.$axios);
                    
                    if (mailRes.data.OPSucess) {
                        this.isSuccess = true; // 将按钮替换为下载按钮

                        this.$message.success({content: '感谢您的信任，我们将在第一时间与您联络',key,duration: 2});
                        
                    } else {

                        this.$message.error({content: '提交失败，请刷新页面重试',key,duration: 2});

                    }

                } else {
                    this.$message.error({content: '验证码已失效，请重新获取',key,duration: 2});
                }
            } catch (error) {

                this.resetForm();
                this.$message.error({content: '错误，请稍后再试！',key,duration: 2});
                
            }
            
        },
        resetForm() {
            this.form = {
                code: '',
                phoneNumbers: '',
                name: '匿名用户'
            },
            this.isSuccess = false;
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/handlebook.scss';
</style>