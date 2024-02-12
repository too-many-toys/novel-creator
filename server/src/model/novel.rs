use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, Deserialize, Serialize, FromRow)]
#[serde(rename_all = "camelCase")]
pub struct NovelModel {
  #[serde(skip_serializing_if = "Option::is_none")]
  pub id: Option<i32>,
  pub title: String,
  pub user_id: i32,
  pub description: String,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub image_url: Option<String>,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub created_at: Option<chrono::DateTime<chrono::Utc>>,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub updated_at: Option<chrono::DateTime<chrono::Utc>>,
}

impl Default for NovelModel {
  fn default() -> Self {
    NovelModel {
      id: None,
      title: "".to_string(),
      user_id: 0,
      description: "".to_string(),
      image_url: None,
      created_at: None,
      updated_at: None,
    }
  }
}

#[derive(Debug, Deserialize, Serialize, FromRow)]
pub struct GenreModel {
  pub id: i32,
  pub genre: String,
}

#[derive(Debug, Deserialize, Serialize, FromRow)]
pub struct ChapterModel {
  pub id: i32,
  pub novel_id: i32,
  pub title: String,
  pub content: String,
  pub created_at: String,
  pub updated_at: String,
}

#[derive(Debug, Deserialize, Serialize, FromRow)]
pub struct NovelTagModel {
  pub id: i32,
  pub novel_id: i32,
  pub tag: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct NovelGenreModel {
  pub id: i32,
  pub genre_id: i32,
  pub novel_id: i32,
}
