/* global wx */

import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from 'actions/counter'

import platformInfo from 'theme/platform'

import './index.scss'


@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))

class Index extends Component {
  componentWillReceiveProps () {}
  componentWillUnmount () { }
  config = {
    navigationBarTitleText: '首页'
  }
  componentDidShow () { }
  componentDidHide () { }

  linkTo () {
    wx.navigateTo({
      url: '../detail/index?id=xx&&text=asd',
    })
  }

  render () {
    console.log(platformInfo, 'res') // eslint-disable-line
    return (
      <View className='home-container'>
        <Button className='add_btn' onClick={this.props.add}>+</Button>
        <Button className='dec_btn' onClick={this.props.dec}>-</Button>
        <Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button>
        <View>
          <Text>{this.props.counter.num}</Text>
        </View>
        <View>
          <Text>Hello, World</Text>
        </View>
        <Button className='link-button' onClick={this.linkTo}>async</Button>
      </View>
    )
  }
}

export default Index
