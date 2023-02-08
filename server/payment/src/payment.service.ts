import { Injectable, Logger } from '@nestjs/common';
import Stripe from 'stripe';
import { StripeSessionToProduct } from './entities/stripeSessionToProduct.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { last, lastValueFrom } from 'rxjs';

@Injectable()
export class PaymentService {
  private stripe: Stripe;
  constructor(
    @InjectRepository(StripeSessionToProduct)
    private readonly stripeRepository: Repository<StripeSessionToProduct>,
  ) {
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

    await this.stripeRepository.insert({
      externalProductId: data.externalProductId,
      stripeSessionId: session.id,
    });

    return session.url;
  }

  async getProduct(data, signature) {
    // Logger.log(data, signature);
    try {
      const endpointSecret = 'whsec_ZAaMK7xxzoztFnoYCVJ6AXHE7ysirjQc';
      const event = this.stripe.webhooks.constructEvent(
        Buffer.from(data.data),
        signature,
        endpointSecret,
      );
      switch (event.type) {
        case 'checkout.session.completed':
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const sessionId = event.data.object.id;
          Logger.log(sessionId);

          return this.stripeRepository
            .findOne({
              where: { stripeSessionId: sessionId },
            })
            .then((res) => res.externalProductId);
        default:
          return null;
      }
    } catch (err) {
      Logger.log(`Webhook Error: ${err.message}`);
      return null;
    }
  }
}
