import Joi from "joi";

const cartSchema = Joi.object({
    user_id: Joi.number(),
    product_id: Joi.number().required(),
    quantity: Joi.number().min(1)
})

export default cartSchema