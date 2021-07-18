import {request} from './request'
export function getHomeMultidata() {
  return request({
    url:'home/multidata'
  })
}

export function getHomeGoods(type,page){
  return request({
    url:'home/data',
    params:{
      type,
      page
    }
  })
}



// 在原数组中插入新数组的值

// let totalNums = []
// let nums1 = [1,2,3]
// let nums2 = [4,5,6]
// for (let n of nums2){
//   nums1.push(n)
// }
// totalNums.push(...nums1)
