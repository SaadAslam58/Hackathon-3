import { Rule } from '@sanity/types';

interface Parent {
  paymentMethod?: string;
}

interface ValidationContext {
  parent?: Parent;
}

const PaymentInfo = {
  name: 'person',
  type: 'document',
  title: 'Person Information',
  fields: [
    {
      name: 'fullName',
      type: 'string',
      title: 'Full Name',
      description: 'The full name of the person.',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'firstName',
      type: 'string',
      title: 'First Name',
      description: 'The first name of the person.',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'lastName',
      type: 'string',
      title: 'Last Name',
      description: 'The last name of the person.',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'email',
      type: 'string',
      title: 'Email',
      description: 'The email address of the person.',
      validation: (Rule: Rule) =>
        Rule.required()
          .regex(
            /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
            { name: 'email', invert: false }
          )
          .error('Invalid email format'),
    },
    {
      name: 'phone',
      type: 'string',
      title: 'Phone Number',
      description: 'The phone number of the person.',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'country',
      type: 'string',
      title: 'Country',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'city',
      type: 'string',
      title: 'City',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'address',
      type: 'string',
      title: 'Address',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'state',
      type: 'string',
      title: 'State',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'postalCode',
      type: 'string',
      title: 'Postal Code',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'date',
      type: 'date',
      title: 'Delivery Date',
      description: 'The delivery date (YYYY-MM-DD).',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'paymentMethod',
      type: 'string',
      title: 'Payment Method',
      description: 'The selected payment method (e.g., Card, Cash).',
      options: {
        list: [
          { title: 'Card', value: 'Card' },
          { title: 'Cash', value: 'Cash' },
        ],
        layout: 'radio',
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'cardNumber',
      type: 'string',
      title: 'Card Number',
      description:
        'Enter the card number. (Visible only when payment method is Card)',
      hidden: ({ parent }: { parent?: Parent }) => parent?.paymentMethod !== 'Card',
      validation: (Rule: Rule, context: ValidationContext = {}) => {
        if (context.parent?.paymentMethod === 'Card') {
          return Rule.required()
            .min(12)
            .max(19)
            .error('Card number must be between 12 and 19 digits');
        }
        return Rule.optional();
      },
    },
    {
      name: 'expiry',
      type: 'string',
      title: 'Expiry Date',
      description: 'Enter the card expiry date (MM/YY).',
      hidden: ({ parent }: { parent?: Parent }) => parent?.paymentMethod !== 'Card',
      validation: (Rule: Rule, context: ValidationContext = {}) => {
        if (context.parent?.paymentMethod === 'Card') {
          return Rule.required().error('Expiry date is required');
        }
        return Rule.optional();
      },
    },
    {
      name: 'cvv',
      type: 'string',
      title: 'CVV',
      description: 'Enter the CVV of the card.',
      hidden: ({ parent }: { parent?: Parent }) => parent?.paymentMethod !== 'Card',
      validation: (Rule: Rule, context: ValidationContext = {}) => {
        if (context.parent?.paymentMethod === 'Card') {
          return Rule.required()
            .min(3)
            .max(4)
            .error('CVV must be 3 or 4 digits');
        }
        return Rule.optional();
      },
    },
    {
      name: 'totalPrice',
      type: 'number',
      title: 'Total Price',
      description: 'The total price of the order.',
      validation: (Rule: Rule) => Rule.required().min(0),
    },
    {
      name: 'cartItems',
      type: 'array',
      title: 'Cart Items',
      description: 'The items in the cart.',
      of: [
        {
          type: 'object',
          name: 'cartItem',
          title: 'Cart Item',
          fields: [
            {
              name: 'id',
              type: 'string',
              title: 'Product ID',
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'name',
              type: 'string',
              title: 'Product Name',
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'price',
              type: 'number',
              title: 'Product Price',
              validation: (Rule: Rule) => Rule.required().min(0),
            },
            {
              name: 'quantity',
              type: 'number',
              title: 'Quantity',
              validation: (Rule: Rule) => Rule.required().min(1),
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'quantity',
            },
          },
        },
      ],
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
};

export default PaymentInfo;
