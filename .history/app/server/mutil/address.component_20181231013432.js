import BaseComponent from './base.component'
const axios = new BaseComponent()
export default class AddressComponent {
    constructor() {
        this.tencentkey = 'RLHBZ-WMPRP-Q3JDS-V2IQA-JNRFH-EJBHL';
        this.tencentkey2 = 'RRXBZ-WC6KF-ZQSJT-N2QU7-T5QIT-6KF5X';
        this.tencentkey3 = 'OHTBZ-7IFRG-JG2QF-IHFUK-XTTK6-VXFBN';
        this.tencentkey4 = 'Z2BBZ-QBSKJ-DFUFG-FDGT3-4JRYV-JKF5O';
        this.baidukey = 'fjke3YUipM9N64GdOIh1DNeK2APO2WcT';
    }
    //获取定位地址
    async guessPosition(ctx){
        let req = ctx.req;
        return new Promise(async (resolve, reject) => {
            let ip;
            const defaultIp = '180.158.102.141';
            try {
                ip = req.headers['x-forwarded-for'] ||
                    req.connection.remoteAddress ||
                    req.socket.remoteAddress ||
                    req.connection.socket.remoteAddress;
                const ipArr = ip.split(':');
                ip = ipArr[ipArr.length - 1] || defaultIp;
            } catch (e) {
                ip = defaultIp;
            }
            if (ip == 1) {
                ip = defaultIp;
            }
            // try {
                let result = await axios.get('http://apis.map.qq.com/ws/location/v1/ip', {
                    ip,
                    key: this.tencentkey,
                })
                if (result.status != 0) {
                    result = await axios.get('http://apis.map.qq.com/ws/location/v1/ip', {
                        ip,
                        key: this.tencentkey2,
                    })
                }
                if (result.status != 0) {
                    result = await axios.get('http://apis.map.qq.com/ws/location/v1/ip', {
                        ip,
                        key: this.tencentkey3,
                    })
                }
                if (result.status != 0) {
                    result = await axios.get('http://apis.map.qq.com/ws/location/v1/ip', {
                        ip,
                        key: this.tencentkey4,
                    })
                }
                if (result.status == 0) {
                    const cityInfo = {
                        lat: result.result.location.lat,
                        lng: result.result.location.lng,
                        city: result.result.ad_info.city,
                    }
                    cityInfo.city = cityInfo.city.replace(/市$/, '');
                    resolve(cityInfo)
                } else {
                    console.log('定位失败', result)
                    reject('定位失败');
                }
            // } catch (err) {
            //     reject(err);
            // }
        })
    }
    //搜索地址
	async searchPlace(keyword, cityName, type = 'search'){
		try{
			const resObj = await axios.get('http://apis.map.qq.com/ws/place/v1/search', {
				key: this.tencentkey,
				keyword: encodeURIComponent(keyword),
				boundary: 'region(' + encodeURIComponent(cityName) + ',0)',
				page_size: 10,
            });
			if (resObj.status == 0) {
				return resObj
			}else{
				throw new Error('搜索位置信息失败');
			}
		}catch(err){
			throw new Error(err);
		}
    }
    	//通过geohash获取精确位置
	async getpois(lat, lng){
		try{
			const params = {
				key: this.tencentkey,
				location: lat + ',' + lng
			};
			let res = await axios.get('http://apis.map.qq.com/ws/geocoder/v1/', params);
			if (res.status != 0) {
				params.key = this.tencentkey2;
	 			res = await axios.get('http://apis.map.qq.com/ws/geocoder/v1/', params);
	 		}
	 		if (res.status != 0) {
	 			params.key = this.tencentkey3;
	 			res = await axios.get('http://apis.map.qq.com/ws/geocoder/v1/', params);
	 		}
	 		if (res.status != 0) {
	 			params.key = this.tencentkey4;
	 			res = await axios.get('http://apis.map.qq.com/ws/geocoder/v1/', params);
	 		}
			if (res.status == 0) {
				return res
			}else{
				throw new Error('通过获geohash取具体位置失败');
			}
		}catch(err){
			console.log('getpois获取定位失败', err)
			throw new Error(err);
		}
	}
}