import fetch from '../config/fetch'
// import Vue from 'vue'

/**
 * 获取个人展示图片
 */

export const getPhotsByUid = (data,headers={}) => fetch('/mys/getUserImg',data, "GET",headers);

/**
 * 获取首页推荐对象 uid 
 */

export const getAdvPerson = (data,headers={}) => fetch('/indexs/getRandInfo',data, "GET",headers);

/**
 * 获取活动列表
 */

export const getActivity = (data,headers={}) => fetch('/act/getAct', data, 'GET',headers);

/**
 * 查询是否参加过活动及参加活动的男女比例 ==> 72小时活动里
 */

export const getActionOn = (data,headers={}) => fetch('/act/getActOn', data, 'GET',headers);

/**
 * 获取匹配历史
 */

export const getMateHistory = (data,headers={}) => fetch('/act/getMateHistory', data, 'GET',headers);

/**
 * 获取匹配对象
 */

export const getCp = (data,headers={}) => fetch('/act/getCP', data, 'GET',headers);

/**
 * 获取活动标签列表
 */

export const getActTag = (data,headers={}) => fetch('/act/act_tag_list', data, 'GET',headers);
 

/**
 * 获取用户选中标签
 */

export const getUserTag = (data,headers={}) => fetch('/act/act_tag_lists', data, 'GET',headers);
 

/**
 * 更新用户活动标签
 */

export const updateUserTag = (data,headers={}) => fetch('/act/addTag', data, 'POST',headers);
 


/**
 * 查看收到的消息列表
 */

export const getShowMsg = (data,headers={}) => fetch('/news/showNews', data, 'GET',headers);

/**
 * 获取个人信息
 */

export const getMyInfo = (data,headers={}) => fetch('/mys/getMyInfo', data, 'GET',headers);

/**
 * 获取用户余额
 */

export const getBalance = (data,headers={}) => fetch('/bill/getBalance', data, 'GET',headers);


/**
 * 获取 用户消费记录
 */

export const getUserRecord = (data,headers={}) => fetch('/bill/getBill', data, 'GET',headers);

/**
 * 获取 发送给好友助力
 */

// export const sendToFirend = (data,headers={}) => fetch('/bill/getBill', data, 'GET',headers);

/**
 * 设置 喜欢
 */

export const addLove = (data,headers={}) => fetch('/indexs/addLove', data, 'POST',headers);

/**
 * 设置 到已经看过
 */

export const addLookRecord = (data,headers={}) => fetch('/indexs/addLookRecord', data, 'POST',headers);

/**
 * 解锁个人信息
 */

export const addToUnlock = (data,headers={}) => fetch('/indexs/unlock', data, 'POST',headers);

/**
 * 发送告白信息
 */

export const sendMsg = (data,headers={}) => fetch('/news/addNews', data, 'POST',headers);

/**
 * 获取微信号
 */

export const getWechatNum = (data,headers={}) => fetch('/indexs/getWx', data, 'GET',headers);

/**
 * 设置微信号
 */

export const updateWechatNum = (data,headers={}) => fetch('/indexs/addWx', data, 'POST',headers);

/**
 * 获取我喜欢的和我解锁的
 */

export const getUnlockList = (data,headers={}) => fetch('/mys/unlockList', data, 'GET',headers);

/**
 * 上传修改意见
 */

export const addAdv = (data,headers={}) => fetch('/mys/addFeedback', data, 'POST',headers);

/** 更新个人信息
 */

export const updateMyInfo = (data,headers={}) => fetch('/mys/saveMyInfo', data, 'POST',headers);

/** 获取注册选项
 */

export const getOptions = (data,headers={}) => fetch('/set/getOptions', data, 'GET',headers);

/** 
 * 移除图片
 */

export const removePic = (data,headers={}) => fetch('/mys/delUserImg', data, 'POST',headers);

/** 
 * 上传图片
 */

export const uploadPic = (data,headers={}) => fetch('/mys/myUploads', data, 'POST',headers);

/** 
 * 上传身份证信息
 */

export const saveCard = (data,headers={}) => fetch('/mys/saveCard', data, 'POST',headers);

/** 
 * 上传身份证图片
 */

export const saveIdCard = (data,headers={}) => fetch('/mys/saveIdCard', data, 'POST',headers);

/** 
 * 活动报名
 */

export const actJoin = (data,headers={}) => fetch('/act/actJoin', data, 'POST',headers);

/** 
 *  保存年龄区间选择
 */

export const updateActAge = (data,headers={}) => fetch('/act/act_age_update', data, 'POST',headers);

/** 
 *  获取助力好友列表
 */

export const getShareList = (data,headers={}) => fetch('/indexs/share_help_list', data, 'GET',headers);

/** 
 *  充值送列表
 */

export const getSend = (data,headers={}) => fetch('/mys/getSend', data, 'GET',headers);

/** 
 *  充值
 */

export const putRecharge = (data,headers={}) => fetch('/bill/recharge', data, 'POST',headers);

/** 
 *  获取任务列表
 */

export const getTask = (data,headers={}) => fetch('/task/getNextTask', data, 'GET',headers);


/** 
 *  注册信息
 */

export const goEnter = (data,headers={}) => fetch('/mys/enroll', data, 'POST',headers);

/** 
 *  发送 短信验证码
 */

export const getMsgCode = (data,headers={}) => fetch('/mys/getCode', data, 'POST',headers);

/** 
 *  验证 短信验证码
 */

export const sendCheckMsg = (data,headers={}) => fetch('/mys/checkCode', data, 'POST',headers);

/** 
 *  上传任务图片
 */

export const completeTask = (data,headers={}) => fetch('/task/completeTask', data, 'POST',headers);

/** 
 *  获取任务图片
 */

export const getActImg = (data,headers={}) => fetch('/task/getActImg', data, 'GET',headers);

/** 
 *  取消喜欢
 */

export const outLove = (data,headers={}) => fetch('/indexs/outLove', data, 'POST',headers);

/** 
 *  获取活动背景图片
 */

export const getActBg = (data,headers={}) => fetch('/act/getActImgs', data, 'POST',headers);

/** 
 *  获取消息列表
 */

export const getNotice = (data,headers={}) => fetch('/mys/getNotice', data, 'GET',headers);

/** 
 *  获取职业父类
 */

export const getProfession = (data,headers={}) => fetch('/mys/getProfession', data, 'GET',headers);

/** 
 *  获取职业子类
 */

export const getProfessionSon = (data,headers={}) => fetch('/mys/getProfessionSon', data, 'GET',headers);


/** 
 *  获取是否有新消息
 */

export const getHaveNew = (data,headers={}) => fetch('/news/getIsShow', data, 'GET',headers);

/** 
 *  获取活动状态
 */

export const getActState = (data,headers={}) => fetch('/act/getActState', data, 'GET',headers);


