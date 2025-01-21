const Review = {
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    {
      name: "productId",
      title: "Product ID",
      type: "string",
    },
    {
      name: "name",
      title: "Reviewer Name",
      type: "string",
    },
    {
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (Rule: { min: (arg0: number) => { max: (arg0: number) => any } }) => Rule.min(1).max(5),
    },
    {
      name: "comment",
      title: "Comment",
      type: "text",
    },
  ],
};

export default Review;
