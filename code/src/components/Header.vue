<template>
  <div
    class="governo-top bg-color-2"
    style="background-image: url('https://www.mis-sp.org.br/assets/site/img/cultura-sp.png')"
  >
    <div class="container">
      <a class="governo-top-btn" href="http://www.cidadao.sp.gov.br/" target="_blank">Cidadão SP</a>
      <div class="gov-social">
        <ul>
          <li>
            <a href="https://www.facebook.com/governosp/" target="_blank">
              <img src="https://www.mis-sp.org.br/assets/site/img/gov_fb.png" alt="/governosp" />
            </a>
          </li>
          <li>
            <a href="https://www.twitter.com/governosp/" target="_blank">
              <img src="https://www.mis-sp.org.br/assets/site/img/gov_tt.png" alt="/governosp" />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/governosp/" target="_blank">
              <img src="https://www.mis-sp.org.br/assets/site/img/gov_ig.png" alt="/governosp" />
            </a>
          </li>
          <li>
            <a href="https://www.flickr.com/governosp/" target="_blank">
              <img src="https://www.mis-sp.org.br/assets/site/img/gov_fr.png" alt="/governosp" />
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/governosp/" target="_blank">
              <img src="https://www.mis-sp.org.br/assets/site/img/gov_yt.png" alt="/governosp" />
            </a>
          </li>
          <li>
            <a href="https://www.issuu.com/governosp/" target="_blank">
              <img src="https://www.mis-sp.org.br/assets/site/img/gov_sm.png" alt="/governosp" />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/company/governosp/" target="_blank">
              <img src="https://www.mis-sp.org.br/assets/site/img/gov_in.png" alt="/governosp" />
            </a>
          </li>
          <li class="gov-social-text">/governosp</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.governo-top {
  position: relative;
  z-index: 1;
  height: 70px;
  background-position: left top;
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-color: $white;
}
.governo-top .container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 100%;
}
@media only screen and (max-width: 600px) {
  .governo-top .container {
    display: block;
  }
}
.governo-top-flag {
  height: 100%;
  float: left;
}
.governo-top-logo {
  height: 100%;
  float: right;
  margin-right: 4%;
  padding: 12px 0;
}
.governo-top-btn {
  display: block;
  padding: 5px 20px;
  margin: auto;
  margin-right: 30px;
  border: 3px solid #000;
  border-radius: 50px;
  color: #000;
  font-weight: 600;
  font-size: 0.8rem;
  text-align: center;
  -webkit-transition: ease 0.3s;
  transition: ease 0.3s;
}
.governo-top-btn:hover {
  background-color: #000;
  color: #fff;
}
@media only screen and (max-width: 992px) {
  .governo-top-btn {
    padding: 5px 10px;
    margin: auto;
    margin-right: 10px;
    display: inline-block;
    min-width: 120px;
    margin-top: 10px;
  }
}
@media only screen and (max-width: 600px) {
  .governo-top-btn {
    margin: 7px 0 0;
    font-size: 10px;
    float: right;
  }
}
.governo-top .gov-social {
  display: inline-block;
  padding: 4px 0 0;
  margin: auto 0;
}
.governo-top .gov-social ul {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  max-width: 100%;
  @include maxWidth(768) {
    margin: 10px 0 0;
  }
}
.governo-top .gov-social ul li {
  padding-left: 0;
  padding-right: 10px;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
}
.governo-top .gov-social ul li img {
  max-width: 100%;
  width: 24px;
  vertical-align: middle;

  @include maxWidth(768) {
    width: 20px;
  }
}
.governo-top .gov-social-text {
  font-size: 1rem;
  font-weight: 600;
  -webkit-box-flex: 3 !important;
  -ms-flex-positive: 3 !important;
  flex-grow: 3 !important;
}
@media only screen and (max-width: 992px) {
  .governo-top .gov-social {
    padding: 0;
    margin-left: 0;
    width: 100%;
  }
}
@media only screen and (max-width: 1200px) {
  .governo-top {
    margin-top: 60px;
    margin-bottom: 70px;
  }
}
@media only screen and (max-width: 992px) {
  .governo-top {
    padding-top: 70px;
  }
}
@media only screen and (max-width: 600px) {
  .governo-top {
    height: 80px;
    padding-top: 0;
    margin-bottom: 0;
    margin-top: 0;
    background-size: auto 37px;
  }
}
</style>