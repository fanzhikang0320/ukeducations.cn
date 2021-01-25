<template>
  <div class="newsDetail-container">
    <div class="newsDetail-content-container">
      <div class="title-area">
        <h1 class="news-title">{{newsData.title}}</h1>
        <div class="info-box">
          <p class="date">最后上传日期:{{newsData.updated}}</p>
          <div class="img-box">
            <img src="@/assets/image/wechat.svg" alt="微信">
            <img src="@/assets/image/weibo.svg" alt="微博">
          </div>
        </div>
      </div>
      <div class="content" v-html="newsData.content"></div>
      <div class="contact-area">
        <ContactForm/>
      </div>
      <FixedAside />
    </div>
    <aside class="fixed-container">
       <dl class="article-list">
        <dt class="fixed-title">其它文章</dt>
      <dd v-for="(item,index) in aboutNewsList" :key="index">
        <div class="img-box">
          <img :src="item.picture" alt="英国留学指南" class="picture" />
          <div class="mask">
            <nuxt-link :to="'/news/' + item.id" class="btn" rel="noopener noreferrer">点击查看全文</nuxt-link>
          </div>
        </div>
        <nuxt-link :to="'/news/' + item.id" rel="noopener noreferrer" class="link">{{item.desc}}</nuxt-link>
      </dd>
       </dl>
    </aside>
  </div>
</template>

<script>
export default {
  validate({ params , redirect}) {
    // Must be a number
    return /^\d+$/.test(params.id)
  },
  async asyncData({params,app,redirect}) {

    try {
      let id = params.id;
      let newsList = await app.$axios.$get('/data/news.json');

      let pageData = newsList.data.filter(ele => {
        return ele.id == id;
      });
      if (pageData.length < 1) {
        redirect('/error');
      }
      return {
        newsData: pageData[0],
        aboutNewsList: newsList.data.slice(0,3)
      }
    } catch (error) {
      redirect('/error');
    }
    
  },
  methods: {
    fixedAside() {
      let asideDom = $('.newsDetail-container .fixed-container');
      let right = $('.newsDetail-container').offset().left;
      let headHeight = $('header').outerHeight();
      let asideOffsetTop =asideDom.offset().top;
      let resetTop = asideDom.position().top;
      let asideHeight = asideDom.outerHeight();
      let scrollTop = $(window).scrollTop();

      let footerOffsetTop = $('footer').offset().top;

      $(window).on('scroll',function () {
        scrollTop = $(window).scrollTop();
        let containerHeight = $('.newsDetail-container').outerHeight();
        if (scrollTop > asideOffsetTop && scrollTop + headHeight + asideHeight < footerOffsetTop) {
         asideDom.css({
           position: 'fixed',
           top: headHeight,
           right: right
         })
        } else if (scrollTop + headHeight + asideHeight > footerOffsetTop) {
          asideDom.css({
            position: 'absolute',
            top: containerHeight - asideHeight,
            right: 0
          })
        } else{
          asideDom.css({
            position: 'absolute',
            top: resetTop,
            right: 0
          })
        }
      })
    },
    formatting() {
      this.$nextTick(() => {
        $('.content h2').css({
          fontSize: '20px',
          fontWeight: 'bold',
          marginTop: '15px'
        })
      })
    }
  },
  mounted() {
    this.fixedAside();
    this.formatting();
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/news_id.scss";
</style>