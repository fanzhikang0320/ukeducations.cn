<template>
  <div class="news-wrapper">
    <div class="news-container">
      <section class="carousel-container">
        <a-carousel class="my-carousel" autoplay :dots="false">
          <div class="carousel-item" v-for="(item,index) in carouselList" :key="index" @click="jump(item.id)">
            <img :src="item.bigPic" alt="英国留学指南" class="picture"/>
            <div class="content-box">
                <h6 class="title">{{item.title}}</h6>
                <p class="line"></p>
                <p class="date">上传日期：{{item.updated}}</p>
                <!-- <p class="slogan">英国留学指南旨在帮助中国家庭找到最适合的英国教育选择。</p> -->
                <div class="text">
                  {{item.desc}}
                </div>
            </div>
          </div>
        </a-carousel>
      </section>
      <section class="studying-about-area">
        <div class="title-box">
            <h5 class="title">留学相关</h5>
            <p class="date" v-if="updated">{{updated}}</p>
        </div>
        <ul class="news-list" v-if="newsList.length != 0">
          <li class="news-item" v-for="(item,index) in newsList" :key="index">
            <div class="news-item-container">
              <div class="show-content">
                <img :src="item.picture" alt="">
                <h6 class="news-title">{{item.title}}</h6>
              </div>
              <div class="news-item-mask">
                <nuxt-link :to="'/news/' + item.id" class="read-link">点击查看全文</nuxt-link>
              </div>
            </div>
            
            <nuxt-link  :to="'/news/' + item.id" class="link-title">{{item.desc}}</nuxt-link>
          </li>
        </ul>
        <div class="null-box" v-else>
          <span class="icon">&#xe624;</span>
          <span class="text">暂无更多文章</span>
        </div>
      </section>
    </div>
    <div class="contact-area">
      <ContactForm/>
    </div>
    <FixedAside />
  </div>
</template>

<script>
export default {
  async asyncData({app,redirect}) {
    try {
      const result = await app.$axios.$get('/data/news.json');

      const carouselList = result.data.filter(ele => {
        return ele.isShow;
      })
      return {
        updated: result.updated,
        newsList: result.data,
        carouselList: carouselList
      }
    } catch(error) {
      redirect('/error')
    }
    
  },
  methods: {
    jump(id) {
      this.$router.push('/news/' + id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/news.scss';
</style>