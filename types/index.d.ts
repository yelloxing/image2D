
// 对象
interface _ {

    filter(): _
    appendTo(): _
    prependTo(): _
    afterTo(): _
    beforeTo(): _
    remove(): _
    text(): string

}
declare function image2D(): _

// 类
declare namespace image2D {

    let formatColor: () => Array<number>
    let getRandomColors: () => Array<string>

}
