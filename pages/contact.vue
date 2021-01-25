<template>
  <div class="contact-page-wrapper">
    <section class="contact-page-banner">
      <h1 class="website-title">
        <span>免费定制留学计划</span>
        <span class="line">——</span>
        <span>选择最好，保障未来</span>
      </h1>
      
    </section>
    <section class="contact-page-container">
      <div class="info-container">
          <p class="info-title">联系我们</p>
          <p class="email"><span class="key">邮箱：</span><span class="value">info@ukeducations.cn</span></p>
          <div class="address-box">
              <span class="key">地址：</span>
              <div class="value">
                  <address>北京办公室 ：北京市朝阳区启阳路金辉大厦1104</address>
                  <address>伦敦办公室：25 Finsbury Circus, London EC2M 7EE</address>
              </div>
          </div>
          <div class="wechat-weibo-box">
              <div class="box-item">
                  <div class="item-title-box">
                      <span class="text">官方微信</span>
                      <img src="@/assets/image/wechat.svg" alt="微信" class="icon-img">
                  </div>
                  <img src="@/assets/image/official_account.jpg" alt="英国留学指南" class="code-picture">
              </div>
              <div class="box-item">
                  <div class="item-title-box">
                      <span class="text">官方微博</span>
                      <img src="@/assets/image/weibo.svg" alt="微博" class="icon-img">
                  </div>
                  <img src="@/assets/image/weibo-code.jpg" alt="英国留学指南" class="code-picture">
              </div>
          </div>
      </div>
      <div class="form-container">
        <h5 class="form-title">快速联系</h5>
        <p class="desc">留下联系方式，我们将会在第一时间给您反馈</p>
        <form class="contact-form" @submit.prevent="submitForm">
          <label>
            <span class="key">姓名</span>
            <div class="input-box">
              <input type="text" v-model="form.name" autocomplete="off" name="username">
            </div>
            
          </label>
          <label>
            <span class="key">手机号</span>
            <div class="input-box">
              <input type="text" v-model="form.phoneNumbers" autocomplete="off" name="phone">
              <button :class="{'btn': true, 'disabled-btn': isCodeIng}" @click.stop="getAuthCode" type="button" :disabled="isCodeIng">
                <span>{{codeTxt}}</span>
              </button>
            </div>

          </label>
          <label>
            <span class="key">验证码</span>
            <div class="input-box">
              <input type="text" v-model="form.code" autocomplete="off" name="code">
            </div>
          </label>
          <button type="submit" class="submit-btn">确认提交</button>
          
        </form>
        
      </div>
    </section>
  </div>
</template>

<script>

import {sendMessage,sendMail, verification} from '~/api/sms'
export default {
  
  data() {
    return {
      form: {
        name: '',
        phoneNumbers: '',
        code: ''
       
      },
      isCodeIng:false,//是否倒计时
      codeTxt:'获取验证码',
    }
  },
  methods: {
    //获取验证码
    getAuthCode() {
      const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
      // 验证用户是否输入手机号
      if (this.form.phoneNumbers.length != 11 || !reg.test(this.form.phoneNumbers)) {
          this.$message.error('请输入11位正确格式的手机号码');
          return false;
      }
      let key = 'updated';
      this.countdown();
      this.$message.loading({content: '正在发送验证码......',key,duration: 0});

      sendMessage({phoneNumbers: this.form.phoneNumbers},this.$axios)
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
    // 倒计时
    countdown() {
      if(!this.isCodeIng){
        //获取验证码倒计时
        this.isCodeIng = true;
        let time = 60;
        let timer = setInterval(()=> {
          time--;
          this.codeTxt = '重新获取'+ time + 's';
          if (time <= 0) {
              this.codeTxt = '获取验证码';
              this.isCodeIng = false;
              clearInterval(timer);
          }
        }, 1000);
      }
    },
    // 验证表单内容
    validate() {
      const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (this.form.name == '' || this.form.name.trim().length == 0) {
        this.$message.error('请输入姓名');
        return false;
      } else if (this.form.phoneNumbers == '') {
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
    // 提交表单
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

            this.resetForm();
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
    // 重置表单
    resetForm() {
      this.form = {
        name: '',
        code: '',
        phoneNumbers: ''
      }
    }
  }

}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/contact.scss';
</style>