# == Schema Information
#
# Table name: channels
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  private    :boolean          default(TRUE), not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Channel < ActiveRecord::Base
  validates :name, :user, presence: true
  validates :private, exclusion: {in: [nil] }
  validate :unique_name
  belongs_to :user
  has_many :messages

  before_save do
    self.name = self.name.downcase
  end

  def unique_name
    if !self.private
      channel2 = Channel.find_by(name: self.name.downcase)
      if channel2 && !channel2.private
        self.errors[:name] << "Channel already exists"
      end
    end
  end
end
