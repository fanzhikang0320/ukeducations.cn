<template>
  <div class="error-wrapper">
    <div class="code">
			<p>ERROR 404</p>
		</div>
		<div class="road">
			<div class="shadow">
				<div class="shelt">
					<div class="head">
						<div class="eyes">
							<div class="lefteye">
								<div class="eyeball"></div>
								<div class="eyebrow"></div>
							</div>
							<div class="righteye">
								<div class="eyeball"></div>
								<div class="eyebrow"></div>
							</div>
						</div>
					</div>
				</div>
				<div class="hat"></div>
				<div class="bubble">
					<a href="/">Go back Home?</a>
				</div>
			</div>
			<p>PAGE NOT FOUND</p>
		</div>
  </div>
</template>

<script>
export default {
    props: ['error'],
    layout: 'white',
    mounted() {
      var parallel = 17;
      var headHeight = 150;
      var opacity = 0;
      var eyeBrowHeight = 0;
      var step = 1;
      var timer_show;
      var timer_eyebrow;

      document.onmousemove = mouseMove;

      function mouseMove(e){
        /*眼球转动*/
      }

      function startAnimation(){
        timer_show = setInterval(rotateCounterclockwise, 55);
        window.setTimeout(function(){
          window.clearInterval(timer_eyebrow);
          timer_show = setInterval(rotateClockwise, 55);
        },1000*6);
      }

      function rotateCounterclockwise() {
        parallel = parallel - 0.3;
        headHeight = headHeight - 2.5;
        opacity = (17 - parallel)/17;
        if(parallel > 0) {
          $('.head').css('top',headHeight+'px');
          $('.hat').css('transform', 'rotate(' + parallel + 'deg)');
      //		$('.code p').css('opacity',opacity);
          $('.bubble').css('opacity',opacity);
        }else{
          window.clearInterval(timer_show);
          timer_eyebrow = setInterval(flash,10);
          
        }
      }

      function rotateClockwise() {
        parallel = parallel + 0.3;
        headHeight = headHeight + 2.5;
        opacity = (17 - parallel)/17;
        if(parallel <= 17) {
          $('.head').css('top',headHeight+'px');
          $('.hat').css('transform', 'rotate(' + parallel + 'deg)');
      //		$('.code p').css('opacity',opacity);
          $('.bubble').css('opacity',opacity);
        }else{
          window.clearInterval(timer_show);
          startAnimation();
        }
      }

      function flash(){
        eyeBrowHeight += step;
        $('.lefteye .eyebrow').css('clip','rect(0px 38px ' + eyeBrowHeight + 'px 0px)');
        $('.righteye .eyebrow').css('clip','rect(0px 38px ' + eyeBrowHeight + 'px 0px)');
        if(eyeBrowHeight % 19 === 0)
          step = -step;
      }

      startAnimation();
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/error.scss'
</style>