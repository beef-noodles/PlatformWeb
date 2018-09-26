
import {IsDisplayHeaderTopic, IsDisplayFooterTopic} from '@layouts/index'
import PubSub from 'pubsub-js'

/**
 * 控制 Footer 显隐
 * @param {boolean} isDisplay 是否显示Footer, 默认true
 */
export const ControlFooterDisplay = (isDisplay: boolean = true) => {
  PubSub.publish(IsDisplayFooterTopic, isDisplay)
}
/**
 * 控制 Header 显隐
 * @param {boolean}  isDisplay  是否显示Header, 默认true
 */
export const ControlHeaderDisplay = (isDisplay: boolean = true) => {
  PubSub.publish(IsDisplayHeaderTopic, isDisplay)
}