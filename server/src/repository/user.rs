use sqlx::{query, query_as};

use crate::model::user::UserModel;

#[derive(Clone)]
pub struct UserRepository {}

impl UserRepository {
  pub fn new() -> Self {
    Self {}
  }
}

impl UserRepository {
  pub async fn find_one_by_id(
    &self,
    pool: &sqlx::Pool<sqlx::MySql>,
    id: i32,
  ) -> Result<UserModel, sqlx::Error> {
    let user = query_as::<_, UserModel>(r#"SELECT * FROM novel WHERE id = ?"#)
      .bind(id)
      .fetch_one(pool)
      .await
      .map_err(|e| e);
    let user = if let Err(e) = user {
      // TODO: 에러 매핑
      return Err(e);
    } else {
      user.unwrap()
    };

    Ok(UserModel {
      id: user.id,
      name: user.name,
      pen_name: user.pen_name,
      intro: user.intro,
      uid: user.uid,
      email: user.email,
      wallet_address: user.wallet_address,
      created_at: user.created_at,
      updated_at: user.updated_at,
    })
  }

  pub async fn find_one_by_wallet_address(
    &self,
    pool: &sqlx::Pool<sqlx::MySql>,
    wallet_address: &String,
  ) -> Result<Option<UserModel>, sqlx::Error> {
    let user = query_as::<_, UserModel>(r#"SELECT * FROM user WHERE wallet_address = ?"#)
      .bind(wallet_address)
      .fetch_optional(pool)
      .await;
    let user = if let Err(e) = user {
      // TODO: 에러 매핑
      return Err(e);
    } else {
      user.unwrap()
    };

    if user.is_none() {
      return Ok(None);
    } else {
      let user = user.unwrap();
      return Ok(Some(UserModel {
        id: user.id,
        name: user.name,
        pen_name: user.pen_name,
        intro: user.intro,
        uid: user.uid,
        email: user.email,
        wallet_address: user.wallet_address,
        created_at: user.created_at,
        updated_at: user.updated_at,
      }));
    }
  }
}

impl UserRepository {
  pub async fn insert_one(
    &self,
    pool: &sqlx::Pool<sqlx::MySql>,
    data: &UserModel,
  ) -> Result<(), sqlx::Error> {
    let query_result = query(
      r#"
      INSERT INTO user (name, email, pen_name, intro, uid, wallet_address)
      VALUES (?, ?, ?, ?, ?, ?)
      "#,
    )
    .bind(&data.name)
    .bind(&data.email)
    .bind(&data.pen_name)
    .bind(&data.intro)
    .bind(&data.uid)
    .bind(&data.wallet_address)
    .execute(pool)
    .await;
    if let Err(e) = query_result {
      // TODO: 에러 매핑
      return Err(e);
    } else {
      Ok(())
    }
  }

  pub async fn insert_one_only_wallet_address(
    &self,
    pool: &sqlx::Pool<sqlx::MySql>,
    wallet_address: &String,
  ) -> Result<(), sqlx::Error> {
    let query_result = query(
      r#"
      INSERT INTO user (wallet_address)
      VALUES (?)
      "#,
    )
    .bind(wallet_address)
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
