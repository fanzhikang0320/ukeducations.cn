<template>
  <div class="entrance-container">
    <section class="banner-area">
        <div class="banner-mask">
            <h1 class="banner-title">
                <p>所有注册服务均由我们的正式启动合作伙伴全面提供</p>
                <p>英国教育指南</p>
            </h1>
        </div>

    </section>
    <section class="mission_area">
        <h2 class="area-title">英国教育指南使命宣言</h2>
        <div class="img-box">
            <div class="img_item">
                <img src="@/assets/image/feizuijia.svg" alt="英国留学指南">
            </div>
            <div class="img_item">
                <img src="@/assets/image/xiangguanxing.svg" alt="英国留学指南">
            </div>
            <div class="img_item">
                <img src="@/assets/image/bijiao.svg" alt="英国留学指南">
            </div>

        </div>
        <p class="desc">为国际家庭提供有关英国教育提供者的最佳，最相关，独立可比较的信息，以帮助他们做出真正明智的决定。</p>
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
@import '~/assets/scss/entrance.scss';
</style>