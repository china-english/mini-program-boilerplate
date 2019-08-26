/* global wx */
import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './index.scss'


@connect(({ counter }) => ({
  counter
}), null)

class Index extends Component {
  componentWillMount () {}
  componentWillReceiveProps () {}
  config = {
    navigationBarTitleText: '详情'
  }
  componentDidShow () { }
  componentDidHide () { }

  goBack = () => {
    wx.navigateBack()
  }
  render () {
    return (
      <View className='index'>
        <Button className='add_btn' onClick={this.goBack}>返回</Button>
        <View><Text>{this.props.counter.num}</Text></View>
        <View><Text>详情</Text></View>
      </View>
    )
  }
}

export default Index
