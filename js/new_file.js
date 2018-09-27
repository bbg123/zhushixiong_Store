 wxConfig: function(shareInfo){
        let query = new http.UrlSearch(),
            config;
     if(http.equipment.wechat() || query.share_code){
            if(http.equipment.android() || !http.isshare){
                    http.ajax({
                        url: 'share',
                        type: 'post',
                        data: {
                            login_token: http.login_token,
                            url: location.href.split('#')[0],
                            share_code: query.share_code
                        },
                        success: res => {
                            console.log(res)
                            if(res.code == 1){
                                http.share_code = res.data.share_code;
                                http.isshare = 1;
                                if(http.equipment.wechat()){
                                    config = {
                                        appId: res.data.info.appid,
                                        timestamp: res.data.info.timestamp,
                                        nonceStr: res.data.info.noncestr, 
                                        signature: res.data.info.signature
                                    };
                                    //config.debug = true;
                                    config.jsApiList= [
                                        'onMenuShareTimeline',
                                        'onMenuShareAppMessage',
                                        'onMenuShareQQ',
                                        'onMenuShareWeibo',
                                        'chooseWXPay'
                                    ];
                                    wx.config(config)
                                    http.wxShare(shareInfo)
                                }  	
                            }
                        }
                    })
              
            }else{
                if(http.equipment.wechat()){
                    http.wxShare(shareI