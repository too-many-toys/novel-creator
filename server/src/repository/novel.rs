use sqlx::{query, query_as};

use crate::model::novel::NovelModel;

pub struct FindAllOptions {
  pub limit: i32,
  pub offset: i32,
}

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
    let novel = query_as::<_, NovelModel>(
      r#"SELECT * 
            FROM novel 
            WHERE id = ?
          "#,
    )
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

  pub async fn find_one_by_title(
    &self,
    pool: &sqlx::Pool<sqlx::MySql>,
    title: String,
  ) -> Result<Option<NovelModel>, sqlx::Error> {
    let novel = query_as::<_, NovelModel>(
      r#"SELECT * 
            FROM novel 
            WHERE title = ?
          "#,
    )
    .bind(title)
    .fetch_optional(pool)
    .await
    .map_err(|e| e);
    let novel = if let Err(e) = novel {
      // TODO: 에러 매핑
      return Err(e);
    } else {
      novel.unwrap()
    };

    if novel.is_none() {
      return Ok(None);
    } else {
      let novel = novel.unwrap();
      Ok(Some(NovelModel {
        id: novel.id,
        title: novel.title,
        user_id: novel.user_id,
        description: novel.description,
        image_url: novel.image_url,
        created_at: novel.created_at,
        updated_at: novel.updated_at,
      }))
    }
  }

  // TODO: 소설 리스트도 같이 조인하도록 변경
  pub async fn find_one_by_wallet_address(
    &self,
    pool: &sqlx::Pool<sqlx::MySql>,
    wallet_address: &String,
  ) -> Result<Option<NovelModel>, sqlx::Error> {
    let novel = query_as::<_, NovelModel>(
      r#"SELECT * 
              FROM novel AS N 
              INNER JOIN user AS U
              ON N.user_id = U.id
              WHERE U.wallet_address = ?
              ORDER BY N.created_at DESC
          "#,
    )
    .bind(wallet_address)
    .fetch_optional(pool)
    .await
    .map_err(|e| e);
    let novel = if let Err(e) = novel {
      // TODO: 에러 매핑
      return Err(e);
    } else {
      novel.unwrap()
    };

    if novel.is_none() {
      return Ok(None);
    } else {
      let novel = novel.unwrap();
      Ok(Some(NovelModel {
        id: novel.id,
        title: novel.title,
        user_id: novel.user_id,
        description: novel.description,
        image_url: novel.image_url,
        created_at: novel.created_at,
        updated_at: novel.updated_at,
      }))
    }
  }

  pub async fn find_all(
    &self,
    pool: &sqlx::Pool<sqlx::MySql>,
    options: Option<FindAllOptions>,
  ) -> Result<Vec<NovelModel>, sqlx::Error> {
    let options = options.unwrap_or(FindAllOptions {
      limit: 10,
      offset: 0,
    });

    let novels = query_as::<_, NovelModel>(r#"SELECT * FROM novel LIMIT ? OFFSET ?"#)
      .bind(options.limit)
      .bind(options.offset)
      .fetch_all(pool)
      .await
      .map_err(|e| e);
    let novels = if let Err(e) = novels {
      return Err(e);
    } else {
      novels.unwrap()
    };

    Ok(novels)
  }

  pub async fn find_all_by_wallet_address(
    &self,
    pool: &sqlx::Pool<sqlx::MySql>,
    wallet_address: &String,
    options: Option<FindAllOptions>,
  ) -> Result<Vec<NovelModel>, sqlx::Error> {
    let options = options.unwrap_or(FindAllOptions {
      limit: 10,
      offset: 0,
    });

    let novels = query_as::<_, NovelModel>(
      r#"SELECT * 
              FROM novel AS N
              INNER JOIN user AS U 
              ON N.user_id = U.id
              WHERE U.wallet_address = ?
              LIMIT ? 
              OFFSET ?
              ORDER BY N.created_at DESC
          "#,
    )
    .bind(wallet_address)
    .bind(options.limit)
    .bind(options.offset)
    .fetch_all(pool)
    .await
    .map_err(|e| e);
    let novels = if let Err(e) = novels {
      return Err(e);
    } else {
      novels.unwrap()
    };

    Ok(novels)
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
