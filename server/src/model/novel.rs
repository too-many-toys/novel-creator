use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
pub struct NovelModel {
  pub id: u32,
  pub title: String,
  pub user_id: u32,
  pub description: String,
  pub image_url: String,
  pub created_at: chrono::DateTime<chrono::Utc>,
  pub updated_at: chrono::DateTime<chrono::Utc>,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct GenreModel {
  pub id: u32,
  pub genre: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct ChapterModel {
  pub id: u32,
  pub novel_id: u32,
  pub title: String,
  pub content: String,
  pub created_at: String,
  pub updated_at: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct NovelTagModel {
  pub id: u32,
  pub novel_id: u32,
  pub tag: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct NovelGenreModel {
  pub id: u32,
  pub genre_id: u32,
  pub novel_id: u32,
}
