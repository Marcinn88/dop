const Post = require('../models/posts.model');

const getAll = async () => {
    return Post.find()
};

const getOne = async (id) => {
    return Post.findById(id);
};

const create = async (data) => {
    return Post.create(data);
};

const update = async (id, data) => {
    return Post.findByIdAndUpdate(id, data, {
        new: true,
    })
};

const updateStatus = async (id, favorite) => {
    return Post.findByIdAndUpdate(id, { favorite }, {
        new: true,
    })
};

const remove = async (id) =>{
    return Post.findByIdAndDelete(id)
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    updateStatus,
    remove,
}