use sqlx::{query, query_as};

use crate::model::novel::NovelModel;

#[derive(Clone)]
pub struct NovelRepository {}

impl NovelRepository {
  pub fn new() -> Self {
    Self {}
  }
}

impl NovelRepository {
  pub async fn find_one_by_id(
    &self,
    pool: &sqlx::Pool<sqlx::MySql>,
    id: i32,
  ) -> Result<NovelModel, sqlx::Error> {
    let novel = query_as::<_, NovelModel>(r#"SELECT * FROM novel WHERE id = ?"#)
      .bind(id)
      .fetch_one(pool)
      .await
      .map_err(|e| e);
    let novel = if let Err(e) = novel {
      // TODO: 에러 매핑
      return Err(e);
    } else {
      novel.unwrap()
    };

    Ok(NovelModel {
      id: novel.id,
      title: novel.title,
      user_id: novel.user_id,
      description: novel.description,
      image_url: novel.image_url,
      created_at: novel.created_at,
      updated_at: novel.updated_at,
    })
  }
}

impl NovelRepository {
  pub async fn insert_one(
    &self,
    pool: &sqlx::Pool<sqlx::MySql>,
    data: &NovelModel,
  ) -> Result<(), sqlx::Error> {
    let query_result = query(
      r#"
      INSERT INTO novel (title, user_id, description, image_url)
      VALUES (?, ?, ?, ?)
      "#,
    )
    .bind(&data.title)
    .bind(&data.user_id)
    .bind(&data.description)
    .bind(&data.image_url)
    .execute(pool)
    .await;
    if let Err(e) = query_result {
      // TODO: 에러 매핑
      return Err(e);
    } else {
      Ok(())
    }
  }
}
