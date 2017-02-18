import jQuery from 'jquery'
import Vue from 'vue'
import App from './App.vue'
import '../node_modules/semantic-ui-css/semantic.min.css'
window.$ = window.jQuery = require('jquery')
//
// import 'semantic-ui-css/semantic.css'
import 'semantic-ui-css/semantic.js'

require('file-loader?name=[name].[ext]!../index.html');

new Vue({
  el: '#app',
  render: h => h(App)
})
