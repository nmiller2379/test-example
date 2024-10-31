const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const { app, User } = require("../server");

chai.use(chaiHttp);
const { expect } = chai;

describe("GET /users", function() {
  this.timeout(5000); // Increase timeout to 5000ms

  before(async () => {
    await mongoose.connection.dropDatabase(); // Clears the db before each test
    await User.create(
      { name: "Alice", email: "a@test.com", age: 25 },
      { name: "Bob", email: "b@test.com", age: 30 }
    );
  });

  after(async () => {
    await mongoose.connection.dropDatabase(); // Clears the db after each test
  });

  it("should return all users", function(done) {
    chai.request(app)
      .get("/users")
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        expect(res.body).to.have.lengthOf(2);
        done();
      });
  });
});
