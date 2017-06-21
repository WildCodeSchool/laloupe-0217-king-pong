const assert = require('assert');
const request = require('supertest');

let app = 'http://localhost:3000',
  admin,
  admin_token,
  user,
  user_token;

describe('API User', function() {

  it("should  create a user", function(done) {
    request(app)
    .post('/users')
    .send({
      pseudo: 'test2',
      email: 'test2@test.fr',
      password: '12345',
    })
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      user = res.body.user;
      user_token = res.body.token;
      assert.equal(user.email, 'test2@test.fr');
      done();
    });
  });

  it("should connect user", function(done) {
    request(app)
      .post('/login')
      .send({
        pseudo: 'test2',
        email: 'test2@test.fr',
        password: '12345'
      })
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        user = res.body.user;
        user_token = res.body.token;
        assert.equal(user.email, 'test2@test.fr');
        done();
      });
  });
  it("should find user by pseudo", function(done) {
    request(app)
      .get('/users/pseudo/'+ user.pseudo)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        assert.equal(res.body.pseudo, 'test2');
        done();
      });
  });
  it("should find user by email", function(done) {
    request(app)
      .get('/users/mail/' + user.email)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        assert.equal(res.body.email, 'test2@test.fr');
        done();
      });
  });
  it("should user add community", function(done) {
    request(app)
      .put('/users/community/'+ user._id)
      .set('Authorization',user_token)
      .send({community : "591ed337c2a0f36f30b37c21"})
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        assert.equal(res.body.user.community[0], '591ed337c2a0f36f30b37c21');
        done();
      });
  });

  it("should connect admin", function(done) {
    request(app)
      .post('/login')
      .send({
        pseudo: 'test',
        email: 'test@test.fr',
        password: '12345'
      })
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        admin = res.body.user;
        admin_token = res.body.token;
        assert.equal(admin.isAdmin, true);
        done();
      });
  });

  it("should admin delete user", function(done) {
    request(app)
      .delete('/users/'+ user._id)
      .set('Authorization',admin_token)
      .expect(200,done);

  });

});
