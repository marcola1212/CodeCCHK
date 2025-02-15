// Acessando a chave da API de Stripe armazenada como variável de ambiente
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
    const { number, month, year, cvc } = JSON.parse(event.body);

    try {
        const paymentMethod = await stripe.paymentMethods.create({
            type: 'card',
            card: {
                number,
                exp_month: month,
                exp_year: year,
                cvc
            },
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ status: 'approved' }),
        };
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ status: 'rejected' }),
        };
    }
};
