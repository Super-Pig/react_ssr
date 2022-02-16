import { SA } from './saUtilsACamera'
import getUA from './getUA'

export function getPerformance(release = '1.0.0') {
    window.performanceSensorData = window.performanceSensorData || {}
    const UA = getUA()

    let timing = window.performance && window.performance.timing
    // Time to Interactive 在主文档的解析器结束工作
    let TTI = timing.domInteractive - timing.fetchStart
    // DOMContentLoaded  初始的 HTML 文档被完全加载和解析完成之后
    let DCL = timing.domContentLoadedEventEnd - timing.fetchStart
    // onload 加载完成耗时
    let L = timing.loadEventStart - timing.fetchStart
    // time to frist byte 获取首字节的耗时
    let TTFB = timing.responseStart - timing.fetchStart
    window.performanceSensorData.H5L = L
    window.performanceSensorData.H5DCL = DCL
    window.performanceSensorData.H5TTI = TTI
    window.performanceSensorData.H5TTFB = TTFB

    let data = JSON.stringify(window.performanceSensorData)

    console.log(data)

    SA.getInstance().then(sa => {
        sa.track('h5_performance_data', {
            fromPlace: 'newbie',
            data: data,
            ...window.performanceSensorData,
            link: window.location.href,
            release,
            // env: __IS_ENV_PRODUCTION__ ? 'production' : 'test',
            os: UA.isIOS ? 'IOS' : UA.isAndroid ? 'android' : 'other'
        })
    })
}