<template>
  <div class="school-detail-container">
    <div class="school-detail-left">
      <section class="school-info-box">
        <div class="title-box">
          <div class="name-box">
            <h2 class="Chinese-name">{{schoolInfo.name.Chinese}}</h2>
            <h2 class="English-name">{{schoolInfo.name.English}}</h2>
          </div>
          <img :src="schoolInfo.logoSrc" alt="" class="logo">
        </div>

        <div class="video-box" v-if="schoolInfo.video.length != 0">
          <div class="current-video-box">
            <video :src="videoSrc" class="current-video" controls></video>
          </div>
          <ul class="video-list">
            <li v-for="(it,id) in schoolInfo.video" :key="'v-'+id">
              <video :src="it"></video>
              <div class="mask-video" @click="changVideo(it)">
                <span class="icon">&#xe737;</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="desc-box" v-if="schoolInfo.description != '' && schoolInfo.description.trim().length != 0">
          <h5 class="desc-title">{{schoolInfo.name.Chinese}}简介：</h5>
          <div class="content" v-html="schoolInfo.description"></div>
        </div>
      </section>
      <table class="table-box">
        <tbody>
          <tr>
            <td>
              <img :src="schoolInfo.logoSrc" alt="" class="logo">
            </td>
            <td>
              <div class="key">
                <span class="c">学校名称：</span>
                <span class="e">Name:</span>
              </div>
              <div class="val">
                <span class="c">{{schoolInfo.name.Chinese}}</span>
                <span class="e">{{schoolInfo.name.English}}</span>
              </div>
            </td>
            <td>
              <div class="key">
                <span class="c">学校类型：</span>
                <span class="e">Type:</span>
              </div>
              <div class="val">
                <span class="c">{{schoolInfo.type == 'mainstream' ? '主流学校（通常少于20%国际学生）' : schoolInfo.type == 'international' ?  '国际学校（通常超过50%的国际学生）' : 'SEN学校'}}</span>
                <span class="e">{{schoolInfo.type == 'mainstream' ? 'Mainstream' : schoolInfo.type == 'international' ? 'International' : 'SEN'}} School </span>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="key">
                <span class="c">学校所在地：</span>
                <span class="e">Location:</span>
              </div>
              <div class="val">
                <span class="c">{{schoolInfo.location.Chinese}}</span>
                <span class="e">{{schoolInfo.location.English}}</span>
              </div>
            </td>
            <td>
              <div class="key">
                <span class="c">所在城镇：</span>
                <span class="e">Town/City:</span>
              </div>
              <div class="val">
                <span class="c">{{schoolInfo.towns.Chinese}}</span>
                <span class="e">{{schoolInfo.towns.English}}</span>
              </div>
            </td>
            <td>
              <div class="key">
                <span class="c">费用：</span>
                <span class="e">Fee:</span>
              </div>
              <div class="val">
                <span class="c">{{schoolInfo.tuition}}英镑/年</span>
                <span class="e">£{{schoolInfo.tuition}}/year</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="key">
                <span class="c">学校地址：</span>
                <span class="e">Address:</span>
              </div>
              <div class="val">
                <span class="c">{{schoolInfo.address.Chinese}}</span>
                <span class="e">{{schoolInfo.address.English}}</span>
              </div>
            </td>
            <td>
              <div class="key">
                <span class="c">寄宿类型：</span>
                <span class="e">Day or Boarding:</span>
              </div>
              <div class="val">
                <span class="c" v-for="(it,id) in schoolInfo.boardingType" :key="'c-'+id">{{it == 'day' ? '走读' : it == 'weekly' ? '周寄宿制' : it == 'full' ? '全寄宿制' : '弹性寄宿制'}}</span>
                <span class="e" v-for="(it,id) in schoolInfo.boardingType" :key="'e-'+id">{{it == 'day' ? 'Day' : it == 'weekly' ? 'Weelkly' : it == 'full' ? 'Full' : 'Flexi'}}</span>
              </div>
            </td>
            <td>
              <div class="key">
                <span class="c">性别：</span>
                <span class="e">Gender:</span>
              </div>
              <div class="val">
                <span class="c">{{schoolInfo.sex == 'mixed' ? '男女混校' : schoolInfo.sex == 'boy' ? '男校' : '女校'}}</span>
                <span class="e">{{schoolInfo.sex == 'mixed' ? 'Mixed' : schoolInfo.sex == 'boy' ? 'Boy' : 'Girl'}}</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="key">
                <span class="c">学校官网：</span>
                <span class="e">Website:</span>
              </div>
              <div class="val">
                <a :href="schoolInfo.website" class="link" target="_blank" rel="noopener noreferrer nofollow">{{schoolInfo.website}}</a>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="key">
                <span class="c">学生总人数：</span>
                <span class="e">Student Number:</span>
              </div>
              <div class="val">
                <span class="c">{{schoolInfo.totalStudents}}</span>
              </div>
            </td>
            <td>
              <div class="key">
                <span class="c">寄宿生总人数：</span>
                <span class="e">Student Number:</span>
              </div>
              <div class="val">
                <span class="c">{{schoolInfo.totalResidentStudent}}</span>
              </div>
            </td>
            <td>
              <div class="key">
                <span class="c">学生年龄：</span>
                <span class="e">Age:</span>
              </div>
              <div class="val">
                <span class="c">
                  <span v-for="(it,id) in schoolInfo.age" :key="'k-'+id">{{it.min}}-{{it.max}}<span v-if="id != schoolInfo.age.length - 1">，</span></span>
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="key">
                <span class="c">公开考试列表（16岁以上）：</span>
                <span class="e">Exam results (most recent):</span>
              </div>
              <div class="val">
                <span class="c">{{schoolInfo.publicExaminations.Chinese}}</span>
                <span class="e">{{schoolInfo.publicExaminations.English}}</span>
              </div>
            </td>
            <td>
              <div class="key">
                <span class="c">特殊教育需求：</span>
                <span class="e">SEN School:</span>
              </div>
              <div class="val">
                <span class="c">{{schoolInfo.specialNeeds ? '适用' : '不适用'}}</span>
                <span class="e">{{schoolInfo.specialNeeds ? 'Yes' : 'Null'}}</span>
              </div>
            </td>
            
          </tr>
          <tr>
            <td>
              <div class="key">
                <span class="c">考试成绩达到ABB或更高的A级成绩（或IB相当于-34分或更高）的学生百分比:</span>
                <span class="e">% of pupils achieving A-Level grades ABB or better, (or IB equivalent - 34 points or better):</span>
              </div>
              <div class="val">
                <span class="c score">{{schoolInfo.highScore}}%</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="key">
                <span class="c">EAL规定概述：</span>
                <span class="e">EAL request:</span>
              </div>
              <div class="val">
                <span class="c">{{schoolInfo.EAL ? '适用' : '不适用'}}</span>
                <span class="e">{{schoolInfo.EAL ? 'Yes' : 'Null'}}</span>
              </div>
            </td>
            <td>
              <div class="key">
                <span class="c">提供饮食选择：</span>
                <span class="e">Food Options:</span>
              </div>
              <div class="val">
                <span class="c">{{schoolInfo.foodChoices ? '适用' : '不适用'}}</span>
                <span class="e">{{schoolInfo.foodChoices ? 'Yes' : 'Null'}}</span>
              </div>
            </td>
            <td>
              <div class="key">
                <span class="c">最近国际机场距离：</span>
                <span class="e">Distance From International Airport:</span>
              </div>
              <div class="val">
                <span class="c">{{schoolInfo.airportDistance}} 英里</span>
                <span class="e">{{schoolInfo.airportDistance}} miles</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <section class="comments-box" v-if="schoolInfo.describe.content != '' && schoolInfo.describe.content.trim().length != 0">
        <h5 class="comments-title">“{{schoolInfo.name.Chinese}}学校生活中的一天”：</h5>
        <div class="comments-content" v-html="schoolInfo.describe.content"></div>
      </section>
      <section class="school-img-box" v-if="schoolInfo.photos.length != 0">
        <div class="title">学校照片</div>
        <div class="img-box">
          <img :src="src" v-for="(src,id) in schoolInfo.photos" alt="" :key="'s-'+id">
        </div>
      </section>
      <section class="contact-area">
        <ContactForm/>
      </section>
      <FixedAside />
    </div>
    <aside class="fixed-container">
      <dl class="similar_school">
        <dt class="title">其它院校</dt>
        <dd v-for="(item,index) in similarData" :key="index" @click.stop="jump(item.name.English)">
          <img :src="item.logoSrc" alt="" class="logo">
          <span class="name">{{item.name.Chinese}}</span>
        </dd>
      </dl>
    </aside>
  </div>
</template>

<script>
import utils from '~/utils'
export default {
  async asyncData({ app,params,redirect }) {
    try {
      const schoolAllData = await app.$axios.$get('/data/school.json');

      
      
      let data = schoolAllData.data.filter(ele => {
        return ele.name.English == utils.decryption(params.id);
      });
      if (data.length == 0) {
        redirect('/error')
      }
      return {
        schoolAllData: schoolAllData.data,
        schoolInfo: data[0],
        videoSrc: data[0].video[0]
      }
    } catch(error) {
      redirect('/error');
    }
    
  },
  data() {
    return {
      similarData: []
    }
  },
  methods: {
    // 固定侧边栏
    fixedAside() {
        let asideDom = $('.school-detail-container .fixed-container');
        let right = $('.school-detail-container').offset().left;
        let headHeight = $('header').outerHeight();
        let asideOffsetTop =asideDom.offset().top;
        let resetTop = asideDom.position().top;
        let asideHeight = asideDom.outerHeight();
        let scrollTop = $(window).scrollTop();

        let footerOffsetTop = $('footer').offset().top;

        $(window).on('scroll',function () {
            scrollTop = $(window).scrollTop();
            let containerHeight = $('.school-detail-container').outerHeight();
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
    /**
     * 切换 当前播放视频连接
     * @param {*} src
     * @return {*}
     */
    changVideo(src) {
      this.videoSrc = src;
    },
    getSimilarData() {
      let randomNum = Math.floor(Math.random() * this.schoolAllData.length - 3); 
      this.similarData = this.schoolAllData.slice(randomNum,randomNum + 3);
    },
    encrypt(str) {
      return utils.encrypt(str);
    },
    jump(name) {
      let key = this.encrypt(name);
      this.$router.push('/school/' + key)
    }
  },
  mounted() {
    this.fixedAside();
    this.getSimilarData();
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/school_id.scss';
</style>