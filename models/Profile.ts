import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  address: { type: String, required: true, unique: true },
  additionalAddresses: { type: String },
  role: { type: String, required: true },
  onchainVerified: { type: Boolean, default: false },
  aadharVerified: { type: Boolean, default: false },
  nomisScore: { type: String, required: true },
  profilePhoto: { type: String, required: true },
});

export default mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);