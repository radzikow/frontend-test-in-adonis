import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BaconsController {
  public async index ({ view }: HttpContextContract) {
    return view.render('bacon')
  }
}
