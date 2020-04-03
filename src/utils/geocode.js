const request=require('request')

const geocode =(address,callback) => {
  
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/'+ address+'.json?access_token=pk.eyJ1IjoidGFuaXNoa2EiLCJhIjoiY2s4NXk2a21rMDZ0azNobW0zenFqb3VjcCJ9.f1xbVLVEpHb_s5T7YyDn8g'
    request({url: url , json: true } ,(error,response) => {
        if (error) {
                callback('uable to coonect to weather app',undefined)
        }else if(response.body.features.length === 0 ){
                 callback('uable to find location',undefined)
        }
        else{
            callback(undefined,{
                latitude:response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location:response.body.features[0].place_name
            })
        }
    })
}



module.exports=geocode