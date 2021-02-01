<template>
  <div class="popup-wrapper">
    <div class="form-container">
        <div class="img-box">
            <img src="@/assets/image/book.png" alt="" class="picture">
        </div>
        
        <div class="form-right">
            <div class="form-title-box">
                <div class="text-box">
                    <p>提交联系信息，即刻下载完整手册</p>
                    <p class="blue">《2021英国留学指南》</p>
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
                <button type="submit" class="btn">立即领取</button>
            </form>
        </div>

        <span class="close" @click.stop="closePopup"></span>
    </div>
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
            isNull: true
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

                        this.resetForm();
                        this.download();
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
            }
        },
        // 下载
        download() {
            let a = document.createElement('a');
            let event = new MouseEvent('click');
            a.download = '2021英国教育指南.pdf';
            a.href = '/data/handlebook.pdf';

            a.dispatchEvent(event);
        },
        // 弹出弹窗
        openPopup() {
            this.$nextTick(() => {
                let wrapper = $('.popup-wrapper');
                let formContainer = $('.popup-wrapper .form-container');

                wrapper.css({
                    display: 'block'
                }).animate({
                    opacity: 1
                },500)

                formContainer.animate({
                    top: '50%',
                    opacity: 1
                })
            })
        },
        // 关闭弹窗
        closePopup() {
            this.$nextTick(() => {
                let wrapper = $('.popup-wrapper');
                let formContainer = $('.popup-wrapper .form-container');

                formContainer.animate({
                    top: '-50%',
                    opacity: 0
                })

                wrapper.animate({
                    opacity: 0
                },500,function () {
                    $(this).css({
                        display: 'none'
                    })
                })
            })

            this.resetForm();
        }
    }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>