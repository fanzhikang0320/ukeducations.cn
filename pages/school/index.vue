<template>
  <div class="school-wrapper">
    <section class="banner-area">
        <h1 class="website-title">
          <span>帮您找到最适合的英国学校</span><span class="line">——</span><span>选择最好，保障未来</span>
        </h1>
    </section>
    <div class="school-container">
      <section class="conditions-area">
        <div class="search-box">
          <a-input class="search-input" placeholder="请输入学校名称" @pressEnter="handleSearch"></a-input>
          <button class="btn" @click="showConditions">
            <span class="text">更多筛选</span>
            <span class="icon">&#xe63b;</span>
          </button>
        </div>
        <div class="conditions-container">
          <div class="conditions-item">
            <span class="conditions-title">年龄：</span>
            <div class="group-box">
              <a-checkbox-group @change="changeAge" v-model="filter.age">
                <a-checkbox :value="setAgeFilter[0]">
                  {{setAgeFilter[0].comment}}
                </a-checkbox>
                <a-checkbox :value="setAgeFilter[1]">
                  {{setAgeFilter[1].comment}}
                </a-checkbox>
                <a-checkbox :value="setAgeFilter[2]">
                  {{setAgeFilter[2].comment}}
                </a-checkbox>
                <a-checkbox :value="setAgeFilter[3]">
                  {{setAgeFilter[3].comment}}
                </a-checkbox>
              </a-checkbox-group>
            </div>
          </div>
          <div class="conditions-item">
            <span class="conditions-title">性别：</span>
            <div class="group-box">
              <a-radio-group v-model="filter.sex" @change="changeSex">
                <a-radio value="all">
                  全部
                </a-radio>
                <a-radio value="boy">
                  男校
                </a-radio>
                <a-radio value="girl">
                  女校
                </a-radio>
                <a-radio value="mixed">
                  男女混校
                </a-radio>
              </a-radio-group>
            </div>
          </div>
          <div class="conditions-item">
            <span class="conditions-title">住宿方式：</span>
            <div class="group-box">
              <a-checkbox-group @change="changeAccommodation" v-model="filter.accommodation">
                <a-checkbox value="day">
                 走读
                </a-checkbox>
                
                <a-checkbox value="weekly">
                  周寄宿制
                </a-checkbox>
                <a-checkbox value="full">
                 全寄宿制
                </a-checkbox>
                <a-checkbox value="flexi">
                  弹性寄宿制
                </a-checkbox>
              </a-checkbox-group>
            </div>
          </div>
          <div class="conditions-item">
            <span class="conditions-title">学校类型：</span>
            <div class="group-box">
              <a-radio-group v-model="filter.school_type" @change="changeSchoolType">
                <a-radio value="all">
                  全部
                </a-radio>
                <a-radio value="international">
                  国际学校（通常超过50%的国际学生）
                </a-radio>
                <a-radio value="mainstream">
                  主流学校（国际学生比例小于20%）
                </a-radio>
                <a-radio value="SEN">
                  SEN学校（特殊教育）
                </a-radio>
              </a-radio-group>
            </div>
          </div>
          <div class="conditions-item">
            <span class="conditions-title">学生人数：</span>
            <div class="group-box">
              <a-radio-group v-model="filter.student_total" @change="changeStudentTotal">
                <a-radio :value="0">
                  {{setStudentTotalFilter[0].comment}}
                </a-radio>
                <a-radio :value="1">
                  {{setStudentTotalFilter[1].comment}}
                </a-radio>
                <a-radio :value="2">
                  {{setStudentTotalFilter[2].comment}}
                </a-radio>
                <a-radio :value="3">
                  {{setStudentTotalFilter[3].comment}}
                </a-radio>
                <a-radio :value="4">
                  {{setStudentTotalFilter[4].comment}}
                </a-radio>
                <a-radio :value="5">
                    {{setStudentTotalFilter[5].comment}}
                </a-radio>
                <a-radio :value="6">
                    {{setStudentTotalFilter[6].comment}}
                </a-radio>
              </a-radio-group>
            </div>
          </div>
          <div class="conditions-item">
            <span class="conditions-title">寄宿生人数：</span>
            <div class="group-box">
              <a-radio-group v-model="filter.boarders_total" @change="changeBoardersTotal">
                <a-radio :value="0">
                  {{setBoardersTotalFilter[0].comment}}
                </a-radio>
                <a-radio :value="1">
                  {{setBoardersTotalFilter[1].comment}}
                </a-radio>
                <a-radio :value="2">
                  {{setBoardersTotalFilter[2].comment}}
                </a-radio>
                <a-radio :value="3">
                  {{setBoardersTotalFilter[3].comment}}
                </a-radio>
              </a-radio-group>
            </div>
          </div>
          <div class="conditions-item conditions-score-item">
            <span class="conditions-title">最新考试成绩：</span>
            <div class="group-box">
              <div class="input-box">
                <a-input :value="filter.sliderMin" @pressEnter="changeMinSlider"></a-input>
                <span>%</span>
              </div>
              
              <a-slider
                range
                :step="1"
                :value="[filter.sliderMin,filter.sliderMax]"
                @afterChange="afterChangeResults"
                @change="changeSlider"
              ></a-slider>
              <div class="input-box">
                <a-input :value="filter.sliderMax" @pressEnter="changeMaxSlider"></a-input>
                <span>%</span>
              </div>
              
            </div>
          </div>
          <p class="desc">备注：达到或高于ABB（或IB相当于34分以上）的学生百分比</p>
        </div>
      </section>
      <section class="result-list-area">
        <div class="result-title-box">已为您筛选出<span class="count">{{total}}</span>所学校</div>
        
        <div class="school-list" v-if="pageData.length != 0">
          <div class="school-item" v-for="(item,index) in pageData" :key="index" @click.stop="phoneJump(item.name.English)">
            <div class="logo-box">
              <img :src="item.logoSrc" :alt="item.name.Chinese" class="logo">
            </div>
            <div class="pc-info-box">
              <div class="info-box">
                <div class="name-box">
                  <span class="Chinese-name">{{item.name.Chinese}}</span>
                  <span class="English-name">{{item.name.English}}</span>
                </div>
                <ul class="attr-list">
                  <li class="address">
                    <span class="key">学校所在地</span>
                    <div class="val">
                      <address>{{item.location.Chinese}}</address>
                      <span class="postcode">{{item.postcode}}</span>
                    </div>
                  </li>
                  <li class="age">
                    <span class="key">年龄</span>
                    <span class="val">
                      <span v-for="(it,id) in item.age" :key="id">{{it.min}}-{{it.max}}<span v-if="id != item.age.length - 1">，</span></span>
                    </span>
                  </li>
                  <li class="sex">
                    <span class="key">性别</span>
                    <span class="val">{{item.sex == 'mixed' ? '男女混校' : item.sex == 'boy' ? '男校' : '女校'}}</span>
                  </li>
                  <li class="money">
                    <span class="key">费用</span>
                    <span class="val">${{item.tuition}}英镑/年</span>
                  </li>
                </ul>
              </div>
              <div class="btn-box">
                <button class="add-compare-btn" v-if="!item.isCompare" @click="addCompare(item)">
                  <span class="text">加入对比</span>
                  <span class="icon">&#xe68a;</span>
                </button>
                <button class="remove-compare-btn" @click="removeCompare(item)" v-else>
                  <span class="text">取消对比</span>
                  <span class="icon">&#xe610;</span>
                </button>
                <nuxt-link :to="'/school/'+ encrypt(item.name.English)" class="link">
                  <span class="text">深入了解该院校</span>
                  <span class="icon">&#xe733;</span>
                </nuxt-link>
              </div>
            </div>
            <div class="phone-info-box">
              <div class="name-box">
                <span class="Chinese-name">{{item.name.Chinese}}</span>
                <span class="English-name">{{item.name.English}}</span>
              </div>
              <button class="add-btn" v-if="!item.isCompare" @click.stop="addCompare(item)">
                <span class="text">加入对比</span>
                <span class="icon">&#xe68a;</span>
              </button>
              <button class="remove-btn" @click.stop="removeCompare(item)" v-else>
                <span class="text">取消对比</span>
                <span class="icon">&#xe610;</span>
              </button>
            </div>
          </div>
        </div>
        <a-pagination v-if="pageData.length != 0" show-quick-jumper :current="currentPage" :pageSize="pageSize" :total="total" @change="changePagination"></a-pagination>
        <div class="null-box" v-if="pageData.length == 0">
          <div class="img-box">
            <img src="@/assets/image/search-null.png" alt="没有符合要求的院校">
          </div>
          <div class="maybe-like-box" v-if="alsoLikeData.length != 0">
            <div class="maybe-like-title">你可能会喜欢</div>
            <div class="school-list">
              <div class="school-item" v-for="(item,index) in alsoLikeData" :key="index">
                <div class="logo-box">
                  <img :src="item.logoSrc" :alt="item.name.Chinese" class="logo">
                </div>
                <div class="pc-info-box">
                  <div class="info-box">
                    <div class="name-box">
                      <span class="Chinese-name">{{item.name.Chinese}}</span>
                      <span class="English-name">{{item.name.English}}</span>
                    </div>
                    <ul class="attr-list">
                      <li class="address">
                        <span class="key">学校所在地</span>
                        <div class="val">
                          <address>英格兰东北</address>
                          <span class="postcode">{{item.postcode}}</span>
                        </div>
                      </li>
                      <li class="age">
                        <span class="key">年龄</span>
                        <span class="val">
                          <span v-for="(it,id) in item.age" :key="id">{{it.min}}-{{it.max}}<span v-if="id != item.age.length - 1">，</span></span>

                        </span>
                      </li>
                      <li class="sex">
                        <span class="key">性别</span>
                        <span class="val">{{item.sex == 'mixed' ? '男女混校' : item.sex == 'boy' ? '男校' : '女校'}}</span>
                      </li>
                      <li class="money">
                        <span class="key">费用</span>
                        <span class="val">${{item.tuition}}英镑/年</span>
                      </li>
                    </ul>
                  </div>
                  <div class="btn-box">
                    <button class="add-compare-btn" v-if="!item.isCompare" @click="addCompare(item)">
                      <span class="text">加入对比</span>
                      <span class="icon">&#xe68a;</span>
                    </button>
                    <button class="remove-compare-btn" v-else @click="removeCompare(item)">
                      <span class="text">取消对比</span>
                      <span class="icon">&#xe610;</span>
                    </button>
                    <nuxt-link :to="'/school/'+ encrypt(item.name.English)" class="link">
                      <span class="text">深入了解该院校</span>
                      <span class="icon">&#xe733;</span>
                    </nuxt-link>
                  </div>
                </div>
                <div class="phone-info-box">
                  <div class="name-box">
                    <span class="Chinese-name">{{item.name.Chinese}}</span>
                    <span class="English-name">{{item.name.English}}</span>
                  </div>
                  <button class="add-btn" v-if="!item.isCompare" @click="addCompare(item)">
                    <span class="text">加入对比</span>
                    <span class="icon">&#xe68a;</span>
                  </button>
                  <button class="remove-btn" @click="removeCompare(item)" v-else>
                    <span class="text">取消对比</span>
                    <span class="icon">&#xe610;</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <section class="compare-list-area">
      <div class="compare-aside-list">
        <h5 class="title">院校对比</h5>
        <ul class="compare-school-list" v-if="compareData.length != 0">
          <li v-for="(item,index) in compareData" :key="index">
            <img :src="item.logoSrc" alt="" class="logo">
            <span class="name">{{item.name.Chinese}}</span>
            <span class="icon" @click="removeCompare(item)">&#xe626;</span>
          </li>
        </ul>
        <div class="null-compare-box" v-else>
          <span class="icon">&#xe646;</span>
          <span class="text">暂无对比学校</span>
        </div>
        <button :class="{'btn': true, 'disabled-btn': compareData.length == 0}" :disabled="compareData.length == 0" @click="startCompare">开始对比</button>
      </div>
      <div class="phone-aside" @click.stop="startCompare">
        <span class="icon">&#xe606;</span>
        <span class="text">院校对比</span>
      </div>
      <div class="compare-results-box" @click.self="closeCompare">
        <div class="compare-results-container">
          <span class="close icon" @click.stop="closeCompare">&#xe63a;</span>
          <table class="compare-table">
            <tbody>
              <tr>
                <td class="attr-key"></td>
                <td class="logo-box" v-for="(item,index) in compareData" :key="index">
                  <img :src="item.logoSrc" alt="" class="logo">
                  <span class="name">{{item.name.Chinese}}</span>
                  <button class="btn" @click.stop="removeCompare(item)">
                    <span>取消对比</span>
                    <span class="icon">&#xe610;</span>
                  </button>
                </td>
              </tr>
              <tr>
                <td class="attr-key">性别</td>
                <td v-for="(item,index) in compareData" :key="index">{{item.sex == 'mixed' ? '男女混校' : item.sex == 'boy' ? '男校' : '女校'}}</td>
              </tr>
              <tr>
                <td class="attr-key">年龄</td>
                <td v-for="(item,index) in compareData" :key="index">
                  <span v-for="(it,id) in item.age" :key="id">{{it.min}}-{{it.max}}岁<span v-if="id != item.age.length - 1">，</span></span>
                </td>
              </tr>
              <tr>
                <td class="attr-key">学生总数</td>
                <td v-for="(item,index) in compareData" :key="index">{{item.totalStudents}}</td>
              </tr>
              <tr>
                <td class="attr-key">寄宿生人数</td>
                <td v-for="(item,index) in compareData" :key="index">{{item.totalResidentStudent}}</td>
              </tr>
              <tr>
                <td class="attr-key">学费</td>
                <td v-for="(item,index) in compareData" :key="index">{{item.tuition}}英镑/年</td>
              </tr>
              <tr>
                <td class="attr-key">
                  <span class="t">学术成绩</span>
                  <p>考试成绩达到ABB或更高的A级成绩（或IB相当于-34分或更高）的学生百分比</p>
                </td>
                <td v-for="(item,index) in compareData" :key="index">{{item.highScore}}%</td>
              </tr>
            </tbody>
          </table>

        </div>

      </div>
    </section>
    <section class="contact-area">
        <ContactForm/>
    </section>
    <FixedAside />
  </div>
</template>

<script>
import utils from '~/utils'
export default {
  data() {
    return {
      setAgeFilter: [
        {
          min: 5,
          max: 7,
          comment: '5-7岁（小学第一阶段）'
        },
        {
          min: 7,
          max: 11,
          comment: '7-11岁（小学第二阶段）'
        },
        {
          min: 11,
          max: 16,
          comment: '11-16岁（初中）'
        },
        {
          min: 16,
          max: 18,
          comment: '16-18岁（高中）'
        }
      ],
      setStudentTotalFilter: [
        {
          min: -Infinity,
          max: Infinity,
          comment: '全部'
        },
        {
          min: -Infinity,
          max: 100,
          comment: '<100'
        },
        {
          min: 100,
          max: 200,
          comment: '100-200'
        },
        {
          min: 200,
          max: 500,
          comment: '200-500'
        },
        {
          min: 500,
          max: 1000,
          comment: '500-1000'
        },
        {
          min: 1000,
          max: 1500,
          comment: '1000-1500'
        },
        {
          min: 1500,
          max: Infinity,
          comment: '>1500'
        }
      ],
      setBoardersTotalFilter: [
        {
          min: -Infinity,
          max: Infinity,
          comment: '全部'
        },
        {
          min: 0,
          max: 25,
          comment: '0-25%'
        },
        {
          min: 25,
          max: 50,
          comment: '25%-50%'
        },
        {
          min: 50,
          max: Infinity,
          comment: '>50%'
        }
      ],
      filter: {
        keyword: '',
        age: [],
        sex: 'all',
        accommodation: [],
        school_type: 'all',
        student_total: 0,
        boarders_total: 0,
        // results: [0,100],
        sliderMin: 0,
        sliderMax: 100
      },
      total: 0, //数据总量
      pageSize: 10, // 每页显示数据的条数
      currentPage: 1, // 默认当前显示第1页
      filterAllData: [], // 筛选完后的总数据
      pageData: [], //当前页要显示的数据
      compareData: [], // 用于对比的数据
      alsoLikeData: [] // 用于可能喜欢
    } 
  },
  async asyncData({app,redirect}) {
    try {
      const schoolAllData = await app.$axios.$get('/data/school.json');
      schoolAllData.data.forEach(ele => {
        ele.isCompare = false; // 用于判断该学校是否加入对比，默认不加入
      })
      return {
        schoolAllData: schoolAllData.data,
        alsoLikeData: schoolAllData.data.slice(0,5)
      }
    } catch(error) {
      redirect('/error');
    }
    
    
  },
  methods: {
    // 加入对比
    addCompare(item) {
      if (this.compareData.length >= 4) {
        this.$message.warning('最多可以对比四所学校');
        return false;
      }
      this.compareData.push(item);

      this.filterAllData.forEach(ele => {
        if (ele.name.Chinese == item.name.Chinese && ele.name.English == item.name.English) {
          ele.isCompare = true;
        }
      })
      this.alsoLikeData.forEach(ele => {
        if (ele.name.Chinese == item.name.Chinese && ele.name.English == item.name.English) {
          ele.isCompare = true;
        }
      })
    },
    // 从列表中删除
    removeCompare(item) {
      
      // 从对比列表中移除
      this.compareData.forEach((ele,index) => {
        if (ele.name.Chinese == item.name.Chinese && ele.name.English == item.name.English) {
          this.compareData.splice(index,1);
        }
      })
      // 将总数据中该条数据的isCompare改为false
      this.filterAllData.forEach(ele => {
        if (ele.name.Chinese == item.name.Chinese && ele.name.English == item.name.English) {
          ele.isCompare = false;
        }
      })
      // 将也许喜欢的数据中该条数据的isCompare改为false
      this.alsoLikeData.forEach(ele => {
        if (ele.name.Chinese == item.name.Chinese && ele.name.English == item.name.English) {
          ele.isCompare = false;
        }
      })

      if (this.compareData.length == 0) {
        this.closeCompare();
      }
    },
    //开始对比
    startCompare() {
      if (this.compareData.length <= 1) {
        this.$message.warn({content: '对比院校不得少于2所',duration: 3})
        return;
      }
      this.$nextTick(() => {
        $('.compare-list-area .compare-results-box').css({
          display: 'block'
        }).animate({
          opacity: 1
        },350)
      })
    },
    closeCompare() {
      this.$nextTick(() => {
        $('.compare-list-area .compare-results-box').animate({
          opacity: 0
        },350).css({
          display: 'none'
        })
      })
    },
    showConditions() {
      this.$nextTick(() => {
        $('.conditions-area .search-box .btn').toggleClass('rotate');
        $('.conditions-area .conditions-container').slideToggle('fast');
      })
    },
    handleSearch(e) {
      let keyword = e.target.value;

      //重置所有条件
      this.filter = {
        keyword: keyword.trim(),
        age: [],
        sex: 'all',
        accommodation: [],
        school_type: 'all',
        student_total: 0,
        boarders_total: 0,
        sliderMin: 0,
        sliderMax: 100
      };

      this.filterData(this.schoolAllData);
      
      
    },
    changeAge(checkedValue) {
      this.filter.age = checkedValue;

      
      this.filterData(this.schoolAllData);
    },
    changeSex(e) {
      this.filter.sex = e.target.value;
      this.filterData(this.schoolAllData);
    },
    changeAccommodation(checkedValue) {
      this.filter.accommodation = checkedValue;
      this.filterData(this.schoolAllData);
    },
    changeSchoolType(e) {
      this.filter.school_type = e.target.value;
      this.filterData(this.schoolAllData);
    },
    changeStudentTotal(e) {
      this.filter.student_total = e.target.value;
      this.filterData(this.schoolAllData);
    },
    changeBoardersTotal(e) {
      
      this.filter.boarders_total = e.target.value;
      this.filterData(this.schoolAllData);
    },
    changeMinSlider(e) {
      
      let value = e.target.value;
      if (value < 0 || isNaN(Number(value))) {
        value = 0
      }
      this.filter.sliderMin = Number(value);
      this.filterData(this.schoolAllData);
    },
    changeMaxSlider(e) {
      let value = e.target.value;
      if (value > 100 || isNaN(Number(value))) {
        value = 100;
      }
      this.filter.sliderMax = Number(value);
      this.filterData(this.schoolAllData);
    },
    changeSlider(value) {
      this.filter.sliderMin = value[0];
      this.filter.sliderMax = value[1];
    },
    afterChangeResults(value) {
      this.filter.sliderMin = value[0];
      this.filter.sliderMax = value[1];
      this.filterData(this.schoolAllData);
    },
    /**
     *  控制分页
     */
    changePagination(page,pageSize) {
      this.currentPage = page;
      let limit = (this.currentPage - 1) * this.pageSize;
      let offset = this.currentPage * this.pageSize;
      this.pageData = this.filterAllData.slice(limit,offset);
    },
    /**
     * @name: 根据关键词过滤
     * @param {*} name
     * @return {*}
     */
    judgeSearchWord(name) {
      
     if (this.filter.keyword == '') {
       return true;
     }
      return name.Chinese.indexOf(this.filter.keyword) != -1 || name.English.indexOf(this.filter.keyword) != -1;
    },

    /**
     * @name: 判断年龄
     * @param {Array} age
     * @return {Boolean}
     */
    judgeAge(age) {
      if (this.filter.age.length == 0 || age.length == 0) {
        return true;
      }
      // 依次比较 是否符合筛选条件中的任意一项
      for (let i = 0; i < age.length; i++) {

        for (let j = 0; j < this.filter.age.length; j++) {
          
          if (age[i].min > this.filter.age[j].max ||age[i].min == this.filter.age[j].max || age[i].max < this.filter.age[j].min || age[i].max == this.filter.age[j].min) {
            continue;
          } else {
            return true;
          }
          
        }
        
      }

      return false;
    },
    /**
     * @name: 判断 性别
     * @param {String} sex
     * @return {Boolean}
     */    
    judgeSex(sex) {
      if (this.filter.sex == 'all') {
        return true;
      }
      return this.filter.sex == sex;
    },
    /**
     * @name: 判断住宿类型
     * @param {Array} type
     * @return {Boolean}
     */
    judgeAccommodation(type) {
      if (this.filter.accommodation.length == 0) {
        return true
      }
      for (let i = 0; i < this.filter.accommodation.length; i++) {
        for (let j = 0; j < type.length; j++) {
          if (this.filter.accommodation[i] == type[j]) {
            return true
          }
        }
      }
      return false;
    },

    /**
     * @name: 判断学校类型
     * @param {String} type
     * @return {Boolean}
     */
    judgeSchoolType(type) {
      if (this.filter.school_type == 'all') {
        return true
      }
      return this.filter.school_type == type;
    },
    /**
     * @name: 判断学生总数
     * @param {Number} num
     * @return {Boolean}
     */
    judgeStudentTotal(num) {
      let index = this.filter.student_total;
      let data = this.setStudentTotalFilter[index];

      return num >= data.min && num < data.max

    },
    /**
     * @name: 判断住宿生人数所占比例
     * @param {Number} num 寄宿生人数
     * @param {Number} total 学生总数
     * @return {Boolean}
     */
    judgeBoardersTotal(num,total) {
      let index = this.filter.boarders_total;
      let data = this.setBoardersTotalFilter[index];
      let ratio = Math.floor(num / total) * 100;

      return ratio >= data.min && ratio < data.max;
    },

    /**
     * @name: 判断最新考试成绩
     * @param {Number} num
     * @return {Boolean}
     */
    judgeResults(num) {
      return num >= this.filter.sliderMin && num <= this.filter.sliderMax;
    },
    /**
     * @name: 过滤筛选数据
     * @param {*} originData
     * @return {*}
     */
    filterData(originData) {
      let data = originData.filter(ele => {
        return this.judgeSearchWord(ele.name) && this.judgeSex(ele.sex) && this.judgeAge(ele.age) && this.judgeAccommodation(ele.boardingType) && this.judgeSchoolType(ele.type) && this.judgeStudentTotal(ele.totalStudents) && this.judgeBoardersTotal(ele.totalResidentStudent,ele.totalStudents) && this.judgeResults(ele.highScore);
      });

      this.currentPage = 1;//每次筛选完成后重置当前页
      this.total = data.length;
      this.filterAllData = data;
      
      this.changePagination(this.currentPage,this.pageSize);
    },
    //加密路由参数
    encrypt(str) {
      return utils.encrypt(str);
    },
    // 移动端跳转
    phoneJump(name) {
      let key = this.encrypt(name);
      this.$nextTick(() => {
        if (window.screen.width <= 750) {
          this.$router.push('/school/'+ key);
        }
      })
    }
  },
  created() {
    this.total = this.schoolAllData.length;
    this.filterData(this.schoolAllData);
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/school_index.scss';
</style>