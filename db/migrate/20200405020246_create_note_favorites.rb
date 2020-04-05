class CreateNoteFavorites < ActiveRecord::Migration[5.2]
  def change
    create_table :note_favorites do |t|
      t.integer :user_id, null:false
      t.integer :note_id, null:false
      t.timestamps
    end
  end
end
