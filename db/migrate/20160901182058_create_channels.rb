class CreateChannels < ActiveRecord::Migration[5.0]
  def change
    create_table :channels do |t|
      t.string :name, null: false
      t.boolean :private, null: false, default: true
      t.integer :user_id, null: false
      t.timestamps null: false
    end
    add_index :channels, :name
    add_index :channels, :private
    add_index :channels, :user_id
  end
end
