const assert = require('assert');
const request = require('supertest');

let app = "http://localhost:300",
    user,
    user_token;

describe('API USER', function() {

    it('should create a user', function(done) {
        request(app)
            .post('/users')
            .send({
                email: "user@mail.fr",
                pseudo: "nail",
                password: "azerty",
                isAdmin: true
            })
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                user = res.body.user;
                user_token = res.body.token;
                assert.equal(res.body.user.email, "user@mail.fr");
                assert.equal(user.isAdmin, true);
                done();
            });

    });
    it('admin should auto delete', function(done) {
            request(app)
                .delete('/users/' + user._id)
                .set('Authorization', user_token)
                .expect(200, done);
        });
});
