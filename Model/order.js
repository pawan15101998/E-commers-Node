const mongoose  = require('mongoose')
const {Schema}  = mongoose;

const orderSchema = new Schema({
 items: {type: [Schema.Types.Mixed], require: true},
 totalAmount: {type: Number},
 totalItems: {type: Number},
 user: {type: Schema.Types.ObjectId, ref: 'user', require: true},
 paymentMethod: {type: String, require: true},
 paymentStatus: {type: String, default:'pending'},
 status: {type: String, default: 'pending', require: true},
 selectedAddress: {type: Schema.Types.Mixed, require: true}
})

const virtual = orderSchema.virtual('id');
virtual.get(function(){
    return this._id;
})
orderSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {delete ret._id}
})

exports.Order = mongoose.model('order', orderSchema)