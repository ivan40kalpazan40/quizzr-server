const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  totalScore: { type: Number, default: 0 },
  testsTaken: { type: Number, default: 0 },
  registered: { type: Date, default: Date.now() },
});

UserSchema.method('updateScore', function (testScore) {
  if (this.totalScore > 0) {
    this.totalScore = (this.totalScore + testScore) / 2;
  } else if (this.totalScore === 0) {
    this.totalScore = testScore;
  }
  this.testsTaken += 1;
  this.save();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
