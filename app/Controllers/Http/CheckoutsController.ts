import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class CheckoutsController {
  public async index ({ view }: HttpContextContract) {
    const state = {
      cart: {
        items: [
          {
            name: 'Apple Watch Sport',
            price: 580,
          },
          {
            name: 'Modern Buckle',
            price: 380,
          },
        ],
        totals: {
          subTotal: 960,
          tax: 0,
          grandTotal: 960,
        },
      },
    }
    return view.render('pages/checkout', state)
  }

  public async order ({ request, response }: HttpContextContract) {
    const orderSchema = schema.create({
      firstName: schema.string(),
      lastName: schema.string(),
      email: schema.string({}, [
        rules.email(),
      ]),
      phone: schema.string({}, [
        rules.mobile(),
      ]),
      creditCard: schema.string({}, [
        rules.regex(new RegExp('^[0-9]{16}$')),
      ]),
      CVV: schema.string({}, [
        rules.regex(new RegExp('^[0-9]{3}$')),
      ]),
      expDate: schema.string({}, [
        rules.regex(new RegExp('^[0-9]{2}\/[0-9]{2}$')),
      ]),
    })

    try {
      await request.validate({ schema: orderSchema })
      response.send({
        message: 'Order successfully placed.',
      })
    } catch (error) {
      response.badRequest({
        message: 'Error occurred while placing the order.',
      })
    }
  }
}
