import { Rule } from '@sanity/types';

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
    },
    {
      name: 'firstName',
      type: 'string',
      title: 'First Name',
      description: 'The first name of the person.',
    },
    {
      name: 'lastName',
      type: 'string',
      title: 'Last Name',
      description: 'The last name of the person.',
    },
    {
      name: 'email',
      type: 'string',
      title: 'Email',
      description: 'The email address of the person.',
      validation: (rule: Rule) =>
        rule
          .regex(
            /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
            { name: 'email' }
          )
          .error('Invalid email format'),
    },
    {
      name: 'phone',
      type: 'string',
      title: 'Phone Number',
      description: 'The phone number of the person.',
    },
    {
      name: 'country',
      type: 'string',
      title: 'Country',
    },
    {
      name: 'city',
      type: 'string',
      title: 'City',
    },
    {
      name: 'address',
      type: 'string',
      title: 'Address',
    },
    {
      name: 'state',
      type: 'string',
      title: 'State',
    },
    {
      name: 'postalCode',
      type: 'string',
      title: 'Postal Code',
    },
    {
      name: 'date',
      type: 'date',
      title: 'Date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
    },
    {
      name: 'paymentMethod',
      type: 'string',
      title: 'Payment Method',
      description: 'The selected payment method (e.g., Card, Cash).',
    },
    {
      name: 'cardNumber',
      type: 'string',
      title: 'Card Number',
      hidden: ({ document }: { document: { paymentMethod: string } }) =>
        document?.paymentMethod !== 'Card',
    },
    {
      name: 'expiry',
      type: 'string',
      title: 'Expiry Date',
      hidden: ({ document }: { document: { paymentMethod: string } }) =>
        document?.paymentMethod !== 'Card',
    },
    {
      name: 'cvv',
      type: 'string',
      title: 'CVV',
      hidden: ({ document }: { document: { paymentMethod: string } }) =>
        document?.paymentMethod !== 'Card',
    },
    {
      name: 'totalPrice',
      type: 'number',
      title: 'Total Price',
    },
    {
      name: 'cartItems',
      type: 'array',
      title: 'Cart Items',
      description: 'The items in the cart.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', type: 'string', title: 'Product ID' },
            { name: 'name', type: 'string', title: 'Product Name' },
            { name: 'price', type: 'number', title: 'Product Price' },
            { name: 'quantity', type: 'number', title: 'Quantity' },
          ],
        },
      ],
    },
  ],
};

export default PaymentInfo;
