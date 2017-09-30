<template>
  <div id="left-panel">
    <div>
    <ul class="side-tabnav-tabs">
      <li class="tab tar-cur">
        <a href="/">
          <i class="fa fa-home fa-fw"></i>
        </a>
      </li>

      <li class="tab tar-cur">
        <a href="/">
          <i class="fa fa-group"></i>
        </a>
      </li>

      <li class="tab tar-cur">
        <a href="/">
          <i class="fa fa-search"></i>
        </a>
      </li>
    </ul>
    </div>

    <ul class="side-tabnav-tabs side-tabnav-bottom">
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
    
      }
    }
  }
</script>

<style lang="scss" scoped>
  #left-panel {
    position: fixed;
    left: 0;
    top: 0;
    width: 50px;
    height: 100%;
    background-color: #30404f
  }

  .side-tabnav-tabs {
    margin-bottom: 1em;
    margin-left: 0;
    width: 50px;
    padding: 0;
    margin: 0;
  }

  .side-tabnav-bottom {
    position: absolute;
    bottom: 0;
  }

  .tab {
    border-radius: 2px;
    overflow: hidden;
    height: 42px;
  }

  a {
    display: block;
    padding: 10px;
    font-size: 14px;
    line-height: 25px;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    font-weight: bold;
    color: #fff;
  }
</style>