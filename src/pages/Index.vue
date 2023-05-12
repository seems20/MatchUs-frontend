<template>
  <van-card
      v-for="user in userList"
      :desc="user.profile"
      :title="`${user.username} (${user.planetCode})`"
      :thumb="user.avatarUrl"
  >
    <template #tags>
      <van-tag plain type="danger" v-for="tag in tags" style="margin-right: 8px; margin-top: 8px" >
        {{tag}}
      </van-tag>
    </template>
    <template #footer>
      <van-button size="mini">联系我</van-button>
    </template>
  </van-card>
  <van-empty v-if="!userList || userList.length < 1" description="数据为空" />
</template>

<script setup >
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {Toast} from "vant";

import myAxios from "../plugins/myAxios.ts";

import qs from 'qs'

const route = useRoute();
const {tags} = route.query;

const mockUser = ref({
  id: 931,
  username: '沙鱼',
  userAccount: 'shayu',
  profile: '一条咸鱼',
  gender: 0,
  phone: '123456789101',
  email: 'shayu-yusha@qq.com',
  planetCode: '931',
  avatarUrl: 'https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/shayu931/shayu.png',
  tags: ['java', 'emo', '打工中', 'emo', '打工中'],
  createTime: new Date(),
})

const userList = ref([]);


onMounted( async () =>{
  // 为给定 ID 的 user 创建请求
  const userListData = await  myAxios.get('/user/recommend',{
    withCredentials: false,
    params: {},
  })
      .then(function (response) {
        console.log('/user/recommend succeed',response);
        Toast.success('请求成功');
        return response?.data;
      })
      .catch(function (error) {
        console.log('/user/recommend error',error);
        Toast.fail('请求失败');
      });
  if (userListData){
    userListData.forEach(user =>{
      if (user.tags){
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
})



</script>

<style scoped>

</style>