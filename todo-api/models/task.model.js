/* eslint-disable max-len */
/* eslint-disable strict */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const TaskSchema = new Schema({
    details: {
        type: String,
        required: 'details is required field'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isParent: {
        type: Boolean,
        default: true
    },
    childrens: [{
        type: Schema.Types.ObjectId,
        ref: 'Task',
        default: null
    }]
}, { timestamps: true });


TaskSchema.pre('remove', async function (next) {
    try {
        if (this.isParent) {
            await this.model('Task').remove({
                _id: {
                    $in: this.childrens
                }
            });
        } else {
            await this.model('Task').updateMany({
                childrens: this._id
            },
                { $pull: { childrens: this._id } });
        }
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model('Task', TaskSchema);
