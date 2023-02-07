import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  private stripe: Stripe;
  constructor() {
    this.stripe = new Stripe(
      'sk_test_51MYt5fEc3nSZXux6PGR326Czz4eaOpndd37nBIHlzEQ7IVOlQ6mvyBvbOSPlP2txdcid6lewZ6xlcJPpytoQ8sVC00XftBZpxa',
      { apiVersion: '2022-11-15' },
    );
  }

  async charge(data) {
    const session = await this.stripe.checkout.sessions.create({
      success_url: data.redirectUrl,
      cancel_url: data.redirectUrl,
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price_data: {
            currency: 'usd',
            product_data: {
              name: data.name,
            },
            unit_amount: data.amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
    });
    return session.url;
  }
}
