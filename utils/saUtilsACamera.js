const serverUrl = __IS_ENV_PRODUCTION__ === undefined || __IS_ENV_PRODUCTION__ ? 'https://sareport.xhey.top/sa?project=ACamera' : 'https://sareport.xhey.top/sa?project=default'

let sa

export const SA = {
  async getInstance() {
    if (sa) {
      return sa
    }

    sa = await import('sa-sdk-javascript')

    sa.init({
      server_url: serverUrl,
      heatmap: {
        //是否开启点击图，默认 default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭
        clickmap: 'default',
        //是否开启触达注意力图，默认 default 表示开启，自动采集 $WebStay 事件，可以设置 'not_collect' 表示关闭
        scroll_notice_map: 'default'
      },
      is_track_single_page: function () {
        return true
      },
      app_js_bridge: true,
      show_log: !__IS_ENV_PRODUCTION__
    })

    sa.quick('autoTrack')

    return sa
  }
}



// export class SA {
//   static sa

//   static async getInstance() {
//     if (SA.sa) {
//       return SA.sa
//     }

//     const sa = await import('sa-sdk-javascript')

//     sa.init({
//       server_url: serverUrl,
//       heatmap: {
//         //是否开启点击图，默认 default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭
//         clickmap: 'default',
//         //是否开启触达注意力图，默认 default 表示开启，自动采集 $WebStay 事件，可以设置 'not_collect' 表示关闭
//         scroll_notice_map: 'default'
//       },
//       is_track_single_page: function () {
//         return true
//       },
//       app_js_bridge: true,
//       show_log: !__IS_ENV_PRODUCTION__
//     })

//     sa.quick('autoTrack')

//     SA.sa = sa

//     return sa
//   }
// }