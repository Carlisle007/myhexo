/**
 * Butterfly
 * ramdom cover
 */

'use strict'

hexo.extend.filter.register('before_post_render', function (data) {
    const {config} = this
    if (config.post_asset_folder) {
        const imgTestReg = /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/
        const topImg = data.top_img
        const cover = data.cover
        if (topImg && topImg.indexOf('/') === -1 && imgTestReg.test(topImg)) data.top_img = data.path + topImg
        if (cover && cover.indexOf('/') === -1) data.cover = data.path + cover
    }

    if (data.cover === false) {
        data.randomcover = randomCover()
        return data
    }

    data.cover = data.cover || randomCover()
    return data
})

function randomCover() {
    const theme = hexo.theme.config
    let cover
    let num

    if (theme.cover && theme.cover.default_cover) {
        if (!Array.isArray(theme.cover.default_cover)) {
            cover = theme.cover.default_cover
            return cover
        } else {
            num = Math.floor(Math.random() * theme.cover.default_cover.length)
            cover = theme.cover.default_cover[num]
            return cover
        }
    } else {
        cover = randomImg()
        return cover
    }
}

function randomImg() {
    let cover
    //随机背景图片数组,图片可以换成图床链接，注意最后一条后面不要有逗号
    var backimg = [
        "/img/bannerOrThumbnail/1.jpeg",
        "/img/bannerOrThumbnail/2.jpeg",
        "/img/bannerOrThumbnail/3.jpeg",
        "/img/bannerOrThumbnail/4.jpeg",
        "/img/bannerOrThumbnail/5.jpeg",
        "/img/bannerOrThumbnail/6.jpeg",
        "/img/bannerOrThumbnail/7.jpeg",
        "/img/bannerOrThumbnail/8.jpeg",
        "/img/bannerOrThumbnail/9.jpeg",
        "/img/bannerOrThumbnail/10.jpeg"
    ];
    //获取背景图片总数，生成随机数
    var bgindex = Math.ceil(Math.random() * (backimg.length - 1));
    cover = backimg[bgindex];
    return cover
}
