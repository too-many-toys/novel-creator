use crate::handlers::user;

pub mod config;
pub mod db;

pub async fn init() -> AppState {
  tracing_subscriber::fmt::init();
  config::read_env();
  let db = db::Db::new().await;
  let novel_repository = super::repository::novel::NovelRepository {};
  let user_repository = super::repository::user::UserRepository {};

  AppState {
    db,
    novel_repository,
    user_repository,
  }
}

#[derive(Clone)]
pub struct AppState {
  pub db: db::Db,
  pub novel_repository: super::repository::novel::NovelRepository,
  pub user_repository: super::repository::user::UserRepository,
}
