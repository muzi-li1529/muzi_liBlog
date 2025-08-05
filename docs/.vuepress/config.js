module.exports = {
  title:'欢迎来到一个深情程序员的个人空间',
  decription:'这里分享一些个人的学习心得和经验，欢迎交流。',
  bese:'/muzi_liBlog/',
  themeConfig:{
    //标题导航
    nav:[
      {text:'首页',link:'/'},
      {text:'我的博客',
        items:[
          {text:'掘金',link:'/'},
          {text:'CSDN',link:'https://blog.csdn.net/qq_65292321?type=blog'}
        ]
      },
      // {text:'分类',link:'/categories/'},
    ],
    //侧边栏
    sidebar: [
      {
        title:'欢迎学习',
        path:'/',
        collapsable:false,//是否折叠
        children:[
          {title:'博客简介',path:'/'}
        ]
      },
      {
        title:'我的工具',
        path:'/tools/watermark',
        collapsable:false,
        children:[
          {title:'明水印',path:'/tools/watermark'},
          {title:'电影院选座',path:'/tools/cinema'},
          {title:'e-charts图表双tooltip',path:'/tools/echarts-tooltip'},
          {title:'e-charts图表末端上下拖动及缩放',path:'/tools/echarts-drag-zoom'},
          {title:'更多好用工具敬请期待',path:'/'}
        ]
      }
    ]
  },
  theme:'reco',
  chainWebpack (config) {
    config.resolve.alias.set('core-js/library/fn', 'core-js/features');
 }

}