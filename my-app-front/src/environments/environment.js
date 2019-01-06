console.log('111',process.env);
const UrlPrefix = 'http://localhost:3001';
if(process.env==='production'){
    UrlPrefix = 'http://47.99.55.188:3001';
}
export const environment = {
    UrlPrefix: UrlPrefix,
    ImgPrefix:'https://fuss10.elemecdn.com',
    ListImgfix:'http://cangdu.org:8001/img/'
};