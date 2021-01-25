<template>
  <div class="home-container">
    <section class="banner_area">
      <h1 class="banner-title"><span>UK Educations</span><span>将帮助您找到适合您孩子的</span><span>最佳英国学校</span></h1>
    </section>
    <section class="site_features_area">
        <h2 class="site_features_title area_title">该站点搜索功能使您可以轻松地找到适合的学校</h2>
        <div class="img-box">
            <div class="img_item">
                <img src="@/assets/image/weizhi.svg" alt="英国留学指南">
            </div>
            <div class="img_item">
                <img src="@/assets/image/zhusu.svg" alt="英国留学指南">
            </div>
            <div class="img_item">
                <img src="@/assets/image/nianling.svg" alt="英国留学指南">
            </div>
            <div class="img_item">
                <img src="@/assets/image/chengji.svg" alt="英国留学指南">
            </div>
            <div class="img_item">
                <img src="@/assets/image/feiyong.svg" alt="英国留学指南">
            </div>
            
            
        </div>
        <p class="desc_text">可按位置，寄宿类型，学生年龄（5-18），学校类型，A-Level和IB结果，学生人数，寄宿生人数，SEN（ 特殊教育需求）条款，EAL（英语作为其他语言）条款和费用等进行检索。</p>
    </section>
    <section class="show_info_area">
        <h2 class="show_info_title area_title">该网站仅展示英国最好的私立学校，这些学校符合以下最低门槛</h2>
        <div class="img_desc_box">
            <div class="img_desc_item">
                <img src="@/assets/image/home_info1.jpg" alt="英国留学指南" class="bg">
                <div class="show_info_mask">
                    <span class="text">学校必须有至少10％的全日制寄宿生</span>
                </div>
                
            </div>
            <div class="img_desc_item">
                <img src="@/assets/image/home_info2.jpg" alt="英国留学指南" class="bg">
                
                <div class="show_info_mask">
                    <span class="text">学校必须有至少10％的国际学生</span>
                </div>
                
            </div>
        </div>
        <p class="show_info_text">建立这些基本要求有助于确保您的孩子在英国拥有<span class="blue">最好的学习经验</span></p>
    </section>
    <section class="partner_area">
        <h2 class="partner_title area_title">我们很自豪地介绍我们的英国官方合作伙伴</h2>
        <div class="partner_logo">
            <img src="@/assets/image/new_AEGIS.png" alt="英国留学指南" class="logo">
            <img src="@/assets/image/new_uk.png" alt="英国留学指南" class="logo">
            <img src="@/assets/image/new_basis.png" alt="英国留学指南" class="logo">
        </div>
    </section>
    <section class="contact-area">
        <ContactForm />
    </section>
    <FixedAside />
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/index.scss';
</style>
