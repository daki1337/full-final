const CONSTANTS = {
  BASE_URL: "http://localhost:3000",
  UPLOAD_FOLDER: "uploads",
  SHIPPING_METHOD: ["free", "nova post", "ukr post"],
  SHIPPING_PRICE: { free: 0, "nova post": 80, "ukr post": 50 },
  ORDER_STATUS: ["new", "paid", "confirm", "shipped", "delivered", "canceled"],
  // STRIPE_SECRET_KEY:
  //   "pk_test_51Rt4l8D0ZvW950QYHZCTgwTGUkwO3QMaUVhfesnisuGTwqQEKUfvEgzSxVWR3Zoj6MbEkgcxwGosX321cWAHh7De00JWPsZ5sj",
};

export default CONSTANTS;
