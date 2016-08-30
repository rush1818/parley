class User < ActiveRecord::Base
  def self.guest_user
    User.find(1)
  end

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user
    user.is_password?(password) ? user : nil
  end

  validates :username, :session_token, :password_digest, presence: true
  validates :username, :session_token, uniqueness: true

  attr_reader :password
  validates :password, length: {minimum: 6, allow_nil: true}
  after_initialize :ensure_session_token


  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(self.password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(32)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(32)
    self.save!
    self.session_token
  end
end
