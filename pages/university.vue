<template>
  <div class="university-wrapper">
    <section class="banner-area">
      <h1 class="website-title">2020年英国大学排名</h1>
    </section>
    <section class="university-container">
      <div class="university-content">
        <p class="desc">在超过150所的英国大学中选出最适合你的英国大学可以说是有些强人所难。因此，对于申请者而言，为了做出一个明智的决定，从大数据角度了解英国各大学是至关重要的。由泰晤士报、英国大学研究力排名和英国大学完全指南发布的英国大学排名能够很好的帮助英国大学申请者进行甄选。与此同时，当你在进行择校时也应该考虑到以下几个因素：</p>
        <ul class="img-list">
            <li>
                <span class="icon">&#xe645;</span>
                <span class="text">大学排名</span>
            </li>
            <li>
                <span class="icon">&#xe60b;</span>
                <span class="text">专业排名</span>
            </li>
            <li>
                <span class="icon">&#xe61d;</span>
                <span class="text">地理位置</span>
            </li>
            <li>
                <span class="icon">&#xe616;</span>
                <span class="text">生活成本</span>
            </li>
            <li>
                <span class="icon">&#xe69b;</span>
                <span class="text">学生满意度</span>
            </li>
            <li>
                <span class="icon">&#xe60c;</span>
                <span class="text">学术研究排名</span>
            </li>
            <li>
                <span class="icon">&#xe60a;</span>
                <span class="text">国际学生比例</span>
            </li>

        </ul>
        <p class="desc">英国大学排名分别是由四大报纸和英国 RAE（Research Assessment Exercise）协会通过各自的评定标准形成。泰晤士报、卫报、独立报、金融时报排名时不做直接的数据研究，而由英国各大学提供原始数据，再经过数据整理分析及综合一系列数据权重而得出英国大学综合排名。各大英国大学排名各有自己主要参考指标，比如TIMES英国大学排名有分开TEACHING QUALITY和RESEARCH QUALITY评价。申请英国大学的MASTER和PHD时，看的更多的是RESEARCH QUALITY。卫报更注重年度学生满意度调查排名， 所以理解了每个英国大学排名的各自标准，你也就理解了为什么同一所英国大学在不同排名榜上的排名不一样，而且为什么一个大学在同一排名表上，每年的变化会很大。</p>
      </div>
      <div class="ranking-area">
        <div class="ranking-title-box">
            <h6 class="title">以下是最新英国大学排名</h6>
            <div class="btn-box">
                <button :class="{'btn': true, 'all-btn': true, 'current': current == 'all_ranking'}" @click="changeRanking('all_ranking')">
                  <span class="text">综合<span class="t">排名</span><span class="icon">&#xe617;</span></span>
                  
                </button>
                <button :class="{'btn': true, 'times-btn': true, 'current': current == 'times_ranking'}" @click="changeRanking('times_ranking')">
                  <span class="text">泰晤士报<span class="t">排名</span><span class="icon">&#xe617;</span></span>
                  
                </button>
                <button :class="{'btn': true, 'guardian-btn': true, 'current': current == 'guardian_ranking'}" @click="changeRanking('guardian_ranking')">
                  <span class="text">卫报<span class="t">排名</span><span class="icon">&#xe617;</span></span>
                  
                </button>
                <button :class="{'btn': true, 'arwu-btn': true, 'current': current == 'arwu_ranking'}" @click="changeRanking('arwu_ranking')">
                  <span class="text">ARWU上海交大<span class="t">排名</span><span class="icon">&#xe617;</span></span>
                  
                </button>
            </div>
        </div>
        <ul class="ranking-list">
            <li class="list-item" v-for="(item,index) in pageData" :key="index">
              <div class="list-item-container">
                  <div class="item-left">
                      <img src="https://static.westwin.com/ukeducation/dataImg/university-icon.svg" alt="" class="logo">
                      <span class="name" :title="item.name">{{item.name}}</span>
                  </div>
                  <div class="item-center">
                      <span class="all-ranking">{{item.all_ranking == 0 ? '/' : item.all_ranking}}</span>
                      <span class="times-ranking">{{item.times_ranking == 0 ? '/' : item.times_ranking}}</span>
                      <span class="guardian-ranking">{{item.guardian_ranking == 0 ? '/' : item.guardian_ranking}}</span>
                      <span class="arwu-ranking">{{item.arwu_ranking == 0 ? '/' : item.arwu_ranking}}</span>
                  </div>
                  <a :href="item.link" rel="noopener noreferrer nofollow" class="more">深入了解院校<span class="icon">&#xe733;</span></a>
              </div>
            </li>
        </ul>
        <a-pagination show-quick-jumper :current="currentPage" :pageSize="pageSize" :total="total" @change="changePagination"></a-pagination>
      </div>
    </section>
    <FixedAside />
  </div>
</template>

<script>
export default {
  async asyncData({app,redirect}) {
    try {
      const universityData = await app.$axios.$get('/data/university.json');
      universityData.data.forEach(ele => {
        ele.all_ranking = ((Number(ele.times_ranking) + Number(ele.guardian_ranking) + Number(ele.arwu_ranking)) / 3).toFixed(2);      
      })
      return {
        universityData: universityData.data
      }
    } catch(error) {
      redirect('/error');
    }
  },
  data() {
    return {
      pageData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      current: 'all_ranking',
      all_ranking_flag: true,
      times_ranking_flag: true,
      arwu_ranking_flag: true,
      guardian_ranking_flag: true
    }
  },
  methods: {
    changePagination(page,pageSize) {
      this.currentPage = page;
      let offset = (page - 1) * pageSize;
      let limit = page * pageSize;
      this.pageData = this.universityData.slice(offset,limit)
    },
    changeRanking(field) {
      this.current = field; //用于点击按钮样式
      let key = field + '_flag';
      let flag = this[key];
      this.sortData(field,flag);
      this[key] = !this[key];
    },
    sortData(field,flag) {
      for (let j = 0; j < this.universityData.length; j++) {

        for (let i = 0; i < this.universityData.length - j - 1; i++) {

          if (flag && (Number(this.universityData[i][field]) > Number(this.universityData[i+1][field]))) {

              let num = this.universityData[i];
              this.universityData[i] = this.universityData[i+1];
              this.universityData[i+1] = num;
          } 


          if (!flag && (Number(this.universityData[i][field]) < this.universityData[i+1][field])) {

              let num = this.universityData[i];
              this.universityData[i] = this.universityData[i+1];
              this.universityData[i+1] = num;
          }
                
        }
      }
      this.total = this.universityData.length;
      this.currentPage = 1;
      this.changePagination(this.currentPage,this.pageSize);
      

    }
  },
  created() {
    this.changeRanking('all_ranking');
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/university.scss';
</style>