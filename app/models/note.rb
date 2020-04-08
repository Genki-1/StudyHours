class Note < ApplicationRecord
  belongs_to :user
  has_many :note_favorites,dependent: :destroy
  has_many :note_comments,dependent: :destroy

  # tagsテーブルとの関連付けを作成 defaultは tag_list
  acts_as_taggable

end
