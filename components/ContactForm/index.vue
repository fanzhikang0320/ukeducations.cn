<template>
  <div class="contact-form-container">
    <div class="title-box">
      <h5 class="form-title">即刻定制留学计划</h5>
      <p class="desc">留下联系方式，我们将会在第一时间给您反馈</p>
    </div>
    <form class="contact-form" @submit.prevent="submitForm">
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
          <button :class="{'btn': true, 'disabled-btn': isCodeIng}" @click.stop="getAuthCode" type="button" :disabled="isCodeIng">
            <span>{{codeTxt}}</span>
          </button>
        </div>

      </label>
      <label>
        <span class="key">验证码</span>
        <div class="input-box">
          <input type="text" autocomplete="off" name="code" v-model="form.code">
        </div>
      </label>
        <button type="submit" class="submit-btn">确认提交</button>
      
    </form>
    <div class="code-box">
      <div class="code-item">
        <div class="item-title">
          <span>官方微信</span>
          <img src="@/assets/image/wechat.svg" alt="英国留学指南">
        </div>
        <img src="@/assets/image/official_account.jpg" alt="英国留学指南">
      </div>
      <div class="code-item">
        <div class="item-title">
          <span>官方微博</span>
          <img src="@/assets/image/weibo.svg" alt="英国留学指南">
        </div>
        <img src="@/assets/image/weibo-code.jpg" alt="英国留学指南">
      </div>
    </div>

  </div>
</template>

<script>
import {sendMessage,verification, sendMail} from '~/api/sms'
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
    getAuthCode(e) {
      e.preventDefault();
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
              this.codeTxt = '获取验证码';
              this.isCodeIng = false;
              clearInterval(timer);
          }
        }, 1000);
      }
    },
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
@import './index.scss';
</style>