
<template>
  
  <div>
    <header>
      <div class="header-container clearfix">
        <div class="logo-box">
          <a href="/">
            <img src="@/assets/image/header-logo.png" alt="英国留学指南">
          </a>
        </div>
        <span class="icon nav-icon" @click="showNav">&#xe603;</span>
        <nav class="main-nav">
            <nuxt-link to="/" rel="noopener noreferrer" exact class="a">首页</nuxt-link>
            <nuxt-link to="/school" rel="noopener noreferrer" class="a">寄宿学校</nuxt-link>
            <nuxt-link to="/university" rel="noopener noreferrer" class="a">热门大学</nuxt-link>
            <nuxt-link to="/entrance" rel="noopener noreferrer" class="a">入学相关</nuxt-link>
            <nuxt-link to="/news" rel="noopener noreferrer" class="a">最新资讯</nuxt-link>
            <nuxt-link to="/contact" rel="noopener noreferrer" class="contact a" >联系我们</nuxt-link>
        </nav>
      </div>
    </header>
    <main class="main-app">
      <Nuxt />
    </main>
    <footer>
      <div class="footer-container">

        <div class="footer-top-wrapper">
          <div class="footer-left">
                <a href="/">
                  <img src="@/assets/image/footer-logo.png" alt="英国留学指南" class="footer-logo"/>
                </a>
                <ul class="footer-nav-list clearfix">
                    <li>
                        <nuxt-link to="/school" rel="noopener noreferrer"  class="a">寄宿学校</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/university" rel="noopener noreferrer" class="a">热门大学</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/entrance" rel="noopener noreferrer" class="a">入学相关</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/news" rel="noopener noreferrer" class="a">最新资讯</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/privacy" rel="noopener noreferrer" class="a">隐私保护协议</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/about" rel="noopener noreferrer" class="a">关于我们</nuxt-link>
                    </li>
                </ul>
                
            </div>
            <div class="footer-right">
                <div class="address-box">
                    <p class="email">info@ukeducations.cn</p>
                    <address>北京办公室 ：北京市朝阳区启阳路金辉大厦1104</address>
                    <address>伦敦办公室：25 Finsbury Circus, London EC2M 7EE</address>
                </div>
                <img src="@/assets/image/official_account.jpg" alt="英国留学指南" class="code-picture"/>
            </div>
        </div>
        <p class="desc">
          <span>Copyright@2020 | ukeducations.cn | 西窗科技（苏州）有限公司 版权所有</span> | <a href="https://beian.miit.gov.cn/" style="color:#A8A7A7;text-decoration:none" target="_blank"><span class="icp">苏ICP备17077173号-7 </span> 工业和信息化部ICP/IP地址/域名信息备案管理系统</a>
        </p>
        
        </div>
    </footer>
  </div>
</template>
<script>
export default {
  methods: {
    showNav() {
      $('header .header-container .main-nav').slideToggle('fast');
    }
  },
  mounted() {

    // 移动端点击完链接 将导航栏收回
    $('.a').on('click',function () {
      if (window.screen.width <= 750) {
        $('header .header-container .main-nav').slideUp('fast');
      }
      
    })
  }
}
</script>
<style lang="scss" scoped>
  @import '~/assets/scss/default.scss';
</style>
