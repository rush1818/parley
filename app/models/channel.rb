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

class Channel < ApplicationRecord

  def self.clean_empty_channels
    channels = Channel.all.select{|ch| ch.subscriber_ids == []}
    channels.each{|ch| ch.destroy}
  end
  validates :name, :user, presence: true
  validates :private, exclusion: {in: [nil] }
  validate :unique_name
  belongs_to :user
  has_many :messages

  has_many :subscriptions,
    primary_key: :id,
    foreign_key: :channel_id,
    class_name: :Subscription,
    dependent: :destroy, inverse_of: :channel

  has_many :subscribers,
    through: :subscriptions,
    source: :user

  before_save do
    self.name = self.name.downcase
    self.name = self.name.split(" ").join("-")
  end

  def change_name
    self.name = self.name.downcase
    self.name = self.name.split(" ").join("-")
  end

  def unique_name
    if !self.private
      channel2 = Channel.find_by(name: self.change_name)
      if channel2 && !channel2.private
        self.errors[:name] << "Channel already exists"
      end
    end
  end

  def duplicate_channel
    # byebug
    channel = Channel.find_by(name: self.change_name)
    if channel && !channel.private
      return channel
    else
      return nil
    end
  end
end
