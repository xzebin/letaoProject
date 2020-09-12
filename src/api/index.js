import instance from "./config.js";

//获取轮播图数据
export async function getLunboDatas(){
    var res = await instance.get('/getlunbo');
    return res.message;
}
//获取推荐商品数据
export async function getRecommendedDatas(limit = 10){
    var res = await instance.get(`/recommend?limit=${limit}`);
    return res.message;
}
//获取新闻列表数据
export async function getNewsDatas(currentPage,pageSize){
    var res = await instance.get(`/getnewslist?page=${currentPage}&pagesize=${pageSize}`);
    return res.message;
}
//根据新闻Id获取对应的新闻详情数据
export async function getNewsDetailByNewsId(newsId){
    var res = await instance.get(`/getnew/${newsId}`);
    return res.message;
}
//根据新闻Id获取对应的新闻评论
export async function getNewsCommentByNewsId(newsId,pageindex){
    var res = await instance.get(`/getcomments/${newsId}?pageindex=${pageindex}`);
    return res.message;
}
//添加评论
export async function addCommentByNewsId(commentInfo,newsId){
    var res = await instance.post(`/postcomment/${newsId}`,commentInfo);
    return res;
}
//获取商品列表数据
export async function getGoodsLists(pageindex){
    var res = await instance.get(`/getgoods?pageindex=${pageindex}`);
    return res.message;
}
//根据商品id获取对应的商品数据
export async function getGoodsDetailByGoodsId(goodsId){
    var res = await instance.get(`/getgoodsinfo/${goodsId}`);
    return res.message;
}
//根据商品id获取对应的商品图片
export async function getGoodsImgByGoodsId(goodsId){
    var res = await instance.get(`/getthumbimages/${goodsId}`);
    return res.message;
}
//根据商品id获取对应的商品图片
export async function getCarGoodsById(idStr){
    var res = await instance.get(`/getshopcarlist/${idStr}`);
    return res.message;
}
//获取所有的美图欣赏菜单
export async function getCategory(){
    var res = await instance.get(`/getcategory`);
    return res.message;
}
//根据id获取对应美图类别的数据
export async function getCatelist(id){
    var res = await instance.get(`/getcatelist/${id}`);
    return res.message;
}
//根据用户名和密码校验登录
export async function getUserByNameAndPwd(data){
    var res = await instance.post(`/login`,data);
    return res;
}
//注册用户
export async function addUser(data){
    var res = await instance.post(`/register`,data);
    return res;
}
//校验用户token
export async function isLogin(){
    let token = localStorage.getItem("token");
    try {
        var res = await instance.post(`/checktoken?token=${token}`);
        return res;
    } catch (error) {
        console.log(error);
    }
}

//根据用户id获取用户收货地址信息
export async function getAddrsByUserId(userId){
    var res = await instance.get(`/getaddress/${userId}`);
    return res;
}
//根据用户id添加收货地址信息
export async function addressAddByUserId(userId,addrInfo){
    var res = await instance.post(`/addaddress/${userId}`,addrInfo);
    return res;
}
//根据地址id修改地址信息
export async function updateaddressByAddrId(addrId,addrInfo){
    var res = await instance.post(`/updateaddress/${addrId}`,addrInfo);
    return res;
}
//根据地址id删除地址信息
export async function delAddr(addrId){
    var res = await instance.post(`/deladdress/${addrId}`);
    return res;
}
//提交订单
export async function commitOrder(orderInfo){
    var res = await instance.post(`/commitorder`,orderInfo);
    return res;
}
//根据用户id获取订单信息
export async function getOrdersByUserId(userId){
    var res = await instance.post(`/userorder/${userId}`);
    return res;
}


//用户添加反馈（还未完善）
//todo
export async function addFeedBack(content,userId){
    let result = {content,userId};
    var res = await instance.post(`/addFeedBack`,result);
    return res;
}