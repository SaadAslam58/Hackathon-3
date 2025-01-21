const PaymentDetailSchema = {
  name: "paymentDetails",
  type: "document",
  title: "Payment Details",
  fields: [
    { name: "fullName", type: "string", title: "Full Name" },
    { name: "firstName", type: "string", title: "First Name" },
    { name: "lastName", type: "string", title: "Last Name" },
    { name: "email", type: "string", title: "Email" },
    { name: "phone", type: "string", title: "Phone" },
    { name: "postalCode", type: "string", title: "Postal Code" },
    { name: "date", type: "date", title: "Date" },
  ],
};

export default PaymentDetailSchema;
