use sqlx::mysql::MySqlPoolOptions;

pub struct Db {
  pub pool: sqlx::Pool<sqlx::MySql>,
}

impl Db {
  pub async fn new() -> Self {
    let pool = MySqlPoolOptions::new()
      .max_connections(5)
      .connect(&std::env::var("DB_HOST").unwrap())
      .await
      .unwrap();

    Self { pool }
  }

  pub fn get_pool(&self) -> &sqlx::Pool<sqlx::MySql> {
    &self.pool
  }
}
