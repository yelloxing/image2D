<template>
  <div>
    <ul id="api-nav" ref="apiNav">
      <li id="how-to-use" class="apimenu-item">
        <router-link to="/api/how-to-use">如何使用</router-link>
      </li>
      <li class="item" @click="goItem($event.target,1)" name="how-to-use">关注的问题</li>
      <li class="item" @click="goItem($event.target,2)" name="how-to-use">使用</li>
      <li class="item" @click="goItem($event.target,3)" name="how-to-use">获取帮助</li>
      <li id="xhtml" class="apimenu-item">
        <router-link to="/api/xhtml">结点操作</router-link>
      </li>
      <li class="item" @click="goItem($event.target,1)" name="xhtml">结点对象</li>
      <li class="item" @click="goItem($event.target,2)" name="xhtml">编辑</li>
      <li class="item" @click="goItem($event.target,3)" name="xhtml">样式和属性</li>
      <li class="item" @click="goItem($event.target,4)" name="xhtml">事件相关</li>
      <li class="item" @click="goItem($event.target,5)" name="xhtml">数据绑定</li>
      <li id="painter" class="apimenu-item">
        <router-link to="/api/painter">画笔</router-link>
      </li>
      <li class="item" @click="goItem($event.target,1)" name="painter">canvas2D</li>
      <li class="item" @click="goItem($event.target,2)" name="painter">svg</li>
      <li class="item" @click="goItem($event.target,3)" name="painter">绘图方法</li>
      <li class="item" @click="goItem($event.target,4)" name="painter">渐变色</li>
      <li class="item" @click="goItem($event.target,5)" name="painter">变换</li>
      <li id="calculate" class="apimenu-item">
        <router-link to="/api/calculate">计算</router-link>
      </li>
      <li class="item" @click="goItem($event.target,1)" name="calculate">二维坐标变换</li>
      <li class="item" @click="goItem($event.target,2)" name="calculate">矩阵坐标变换</li>
      <li class="item" @click="goItem($event.target,3)" name="calculate">曲线插值</li>
      <li class="item" @click="goItem($event.target,4)" name="calculate">布局</li>
      <li id="tool" class="apimenu-item">
        <router-link to="/api/tool">补充</router-link>
      </li>
      <li class="item" @click="goItem($event.target,1)" name="tool">图层</li>
      <li class="item" @click="goItem($event.target,2)" name="tool">动画轮询</li>
      <li class="item" @click="goItem($event.target,3)" name="tool">获取颜色</li>
    </ul>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import update from "../service/update";
import $$ from "image2d";

export default {
  methods: {
    doScroll() {
      let toTop = document.documentElement.scrollTop || document.body.scrollTop;

      // 控制左边菜单位置
      let apiNav = document.getElementById("api-nav");
      if (toTop > 70) apiNav.style.top = toTop - 70 + "px";
      else apiNav.style.top = "0px";
    },
    goItem(target, index) {
      // 先切换大菜单
      $$("li.item", this.$refs.apiNav).attr("active", "no");
      this.$router.push("/api/" + $$(target).attr("name"));

      // 稍等片刻，触发滚动
      window.setTimeout(function() {
        $$(target).attr("active", "yes");
        document.documentElement.scrollTop = $$(".title.small")[
          index - 1
        ].offsetTop;
      }, 200);
    }
  },
  mounted() {
    update("api");
    window.addEventListener("scroll", this.doScroll);
    document.getElementsByTagName("title")[0].innerText = "文档 | image2D";
  },
  destroyed() {
    window.removeEventListener("scroll", this.doScroll);
  }
};
</script>

<style lang="scss" scoped>
$navWidth: 1.4rem;

div {
  font-size: 0;

  & > * {
    display: inline-block;
    font-size: 0.16rem;
    vertical-align: top;
  }

  & > ul {
    width: $navWidth;
    padding: 0.3rem 0.1rem;
    position: relative;
    max-height: calc(100vh - .8rem);
    overflow-y: scroll;

    & > li {
      color: rgb(167, 160, 160);

      & > a {
        width: 100%;
        display: inline-block;
        text-align: left;
        line-height: 2em;
        font-size: 0.14rem;
        color: inherit;
      }

      &[active="yes"] > a {
        color: rgb(113, 30, 50);
        font-weight: 800;
      }

      &.item {
        cursor: pointer;
        line-height: 1.8em;

        &[active="yes"] {
          color: rgb(113, 30, 50);
          font-weight: 800;
        }

        padding-left: 1em;
        font-size: 0.13rem;
      }
    }
  }

  & > div {
    width: calc(100% - #{$navWidth});
    padding: 0.1rem;

    /deep/ .container {
      width: 100%;
      line-height: 2em;

      & > pre {
        font-size: 0.14rem;
      }

      & > .title {
        font-weight: 800;
        line-height: 2em;
        padding: 0.4rem 0 0.2rem;
        margin-top: -0.3rem;

        &.big {
          font-size: 0.18rem;
          color: rgb(203, 83, 139);
        }

        &.small {
          font-size: 0.16rem;
          color: rgb(203, 83, 139);
        }

        &.little {
          font-size: 0.14rem;
          color: #85a646;
        }

        &.sub-little {
          font-size: 0.12rem;
          color: #f00;
        }
      }

      & > p {
        text-indent: 2em;
        font-size: 0.14rem;
        font-weight: 600;

        & > a {
          text-indent: 0;
          color: #ac2c23;
          text-decoration: underline;
        }

        &.warn {
          background-image: url("../assets/warn.png");
          background-repeat: no-repeat;
          background-size: auto 0.21rem;
          font-size: 0.12rem;
          color: #dac305;
          font-weight: 400;
        }

        &.nav-footer {
          & > a {
            &.pre,
            &.next {
              padding: 0.1rem 0.5rem;
              text-decoration: none;

              &::before,
              &::after {
                display: inline-block;
                width: 1.5em;
                height: 1.5em;
              }
            }

            &.pre {
              float: left;

              &::before {
                content: "←";
                text-align: left;
              }
            }

            &.next {
              float: right;

              &::after {
                content: "→";
                text-align: right;
              }
            }
          }
        }
      }

      & > ul {
        margin-left: 5em;
        font-size: 0.13rem;
        line-height: 2.4em;

        & > li {
          list-style-type: decimal;
        }
      }
    }
  }
}
</style>
