<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>
import * as Three from 'three'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Ball',
  async asyncData ({ store, error }) {
    // 对 axios 进行批量处理
    let [ res ] = await Promise.all([
      store.dispatch('banner')
    ]).catch((e) => {
      error({ statusCode: 404, message: 'Post not found' })
    })
    return {
      banner: res.banner
    }
  },
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null
    }
  },
  methods: {
    init: function() {
      let container = document.getElementById('container');

      this.camera = new Three.PerspectiveCamera(70, container.clientWidth/container.clientHeight, 0.01, 10);
      this.camera.position.z = 1;

      this.scene = new Three.Scene();

      let geometry = new Three.BoxGeometry(0.2, 0.2, 0.2);
      let material = new Three.MeshNormalMaterial();

      this.mesh = new Three.Mesh(geometry, material);
      this.scene.add(this.mesh);

      this.renderer = new Three.WebGLRenderer({antialias: true});
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);

    },
    animate: function() {
      requestAnimationFrame(this.animate);
      this.mesh.rotation.x += 0.01;
      this.mesh.rotation.y += 0.02;
      this.renderer.render(this.scene, this.camera);
    },
    test(){
      this.axios.post('/dbapi.php', param)
        .then(function (response) {
          if(response.code != 200){
            _this.$router.push({ path: '/' });
          }else {
            var arr = [];
            var data = response.data
            for (let i in data) {
              let o = {};
              o.id = i;
              o.info = data[i];
              arr.push(o)
            }
            _this.totalData = arr;
            _this.totalPage = arr.length;
            _this.initPage(1)
          }
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  },
  mounted() {
    this.init();
    this.animate()
  }
};
</script>

<style scoped>
  #container {
    height: 400px;
  }

</style>
