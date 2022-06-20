const { models } = require('../models');

exports.getImgInfoByBookId = (bookId) => models.book_image.findAll({
    where: ({book_id: bookId }),
    raw: true
})

exports.getAvatarImgByBookId = (bookId) => models.book_image.findOne({
    where: ({book_id: bookId }),
    raw: true
})


exports.getImgIdByBookId = async (bookId) => {
    const imgIds = await models.book_image.findAll({
            where: ({book_id: bookId}),
            attributes: ['id'],
        }
    )

    return imgIds.map(function (cur){
        return cur.id;
    });

}


exports.addImg = async (bookId, src) => {

    const maxId = await models.book_image.max('id');
    const nextId = maxId + 1;
    const img = await models.book_image.create({id: nextId, book_id: bookId, src: src});
    return img;
}



exports.deleteImgByIds = async (listIds) => {
    try
    {
        models.book_image.destroy(
            {
                where: {
                    id: listIds
                }
            }
        );
    }catch (e){
        return false;
    }
}