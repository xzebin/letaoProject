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
    var res = await instance.get(`/postcomment/${newsId}`,{commentInfo});
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