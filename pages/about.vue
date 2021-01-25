<template>
  <div class="about-container">
      <div class="about-container-left">
          <div class="banner-box">
              <div class="about-banner">
                  <p class="text">关于我们——英国留学指南, 保障未来！</p>
                  <div class="phone-text">
                      <p>关于我们</p>
                      <p>英国留学指南, 保障未来！</p>
                  </div>
                  <div class="img-box">
                      <img src="@/assets/image/wechat.svg" alt="英国留学指南" class="icon"/>
                      <img src="@/assets/image/weibo.svg" alt="英国留学指南" class="icon"/>
                  </div>

              </div>
              <div class="content">
                  <p>我们深知，送孩子出国上学对于家庭来说是一个重大的决定，目前，没有一个网站和机构可以研通过全方位多角度的研究，提供给家长和孩子需要了解的广泛因素，以帮助他们做出正确的选择，哪所学校才是最适合的。加之国内和英国教育体系的差异，让家长和孩子选择在英国的学习做出决定显得更加复杂。</p>
                  <p>因此，英国留学指南旨在帮助学生家长找到最适合的英国教育选择。为家长和孩子提供有关英国学校的最全面，最相关，独立和可比的信息，以帮助他们做出真正明智的决定。</p>
              </div>
          </div>

          <h5 class="title">我们为何与众不同？</h5>
          <div class="content">
              <p>我们不为任何特定的学校或大学工作 - 我们100％独立，在这里有100多个学校可供选择，他们能够为中国孩子和学生提供优质教育。</p>
              <p>我们网站上的所有信息都是客观和真实的。我们向您提供相关的、可比较的信息，您可以根据这些信息来决定选择哪所学校？每所学校有多少学生？有多少国际学生？有多少寄宿生？每个学校如何教英语以及更多其他信息...</p>
          </div>
          <h5 class="title">英国留学指南的价值观：</h5>
          <div class="content">
              <p>1.我们与学校、大学和家庭打交道时秉持着诚实和透明的原则。</p>
              <p>2.我们是独立的 - 我们不为任何特定的学校或大学工作，也不偏袒任何机构。我们承诺一定努力为每个年轻人找到适合他们的最好的机构。</p>
              <p>3.我们对教育充满热情 - 我们希望每个年轻人无论身在何处都能获得美好的教育。</p>
          </div>
          <h5 class="title">使命宣言：</h5>
          <div class="content">
              <p>为国际家庭提供有关英国教育机构的最佳、最相关、独立和可比较的信息，以帮助他们做出明智的决策</p>
          </div>
          <h5 class="title">我们是谁？</h5>
          <div class="content">
              <p>我们在英国教育系统工作多年。我们感谢每个家庭各不相同，我们做出一个决定不仅仅需要考虑花费，还包括许多关于每个申请人的具体情况和信息。这就是为什么该网站提供11岁以上的申请途径。我们提供的信息是完全公正的、可比较的，并且信息获取的来源是官方认证的- 通常是来源于政府网站。</p>
          </div>
          <h5 class="title">权威合作机构：</h5>
          <div class="content">
              <p>我们很自豪的宣布我们是英国权威寄宿学校合作组织的官方合作伙伴</p>
          </div>
          <div class="school-img-box">
              <img src="@/assets/image/new_AEGIS.png" alt="英国留学指南"/>
              <img src="@/assets/image/new_uk.png" alt="英国留学指南"/>
              <img src="@/assets/image/new_basis.png" alt="英国留学指南"/>
          </div>
          <section class="contact-area">
                <ContactForm />
          </section>
          <FixedAside />
      </div>
      <aside class="fixed-container">
          <dl class="partner-institutions">
              <dt>合作院校</dt>
              <dd>
                  <img src="@/assets/image/partner_schools_1.png" alt="英国留学指南" class="school-logo"/>
              </dd>
              <dd>
                  <img src="@/assets/image/partner_schools_2.png" alt="英国留学指南" class="school-logo"/>
              </dd>
              <dd>
                  <img src="@/assets/image/partner_schools_3.png" alt="英国留学指南" class="school-logo"/>
              </dd>
          </dl>
      </aside>
  </div>
</template>

<script>
export default {
    methods: {
        fixedAside() {
        let asideDom = $('.about-container .fixed-container');
        let right = $('.about-container').offset().left;
        let headHeight = $('header').outerHeight();
        let asideOffsetTop =asideDom.offset().top;
        let resetTop = asideDom.position().top;
        let asideHeight = asideDom.outerHeight();
        let scrollTop = $(window).scrollTop();

        let footerOffsetTop = $('footer').offset().top;

        $(window).on('scroll',function () {
            scrollTop = $(window).scrollTop();
            let containerHeight = $('.about-container').outerHeight();
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
        }
    },
    mounted() {
        this.fixedAside();
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/about.scss';
</style>