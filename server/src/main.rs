use axum::{
  routing::{get, post},
  Router,
};

use server::context;
use server::services;

#[tokio::main]
async fn main() {
  tracing_subscriber::fmt::init();

  context::config::read_env();
  context::db::Db::new().await;

  let app = Router::new()
    .route("/health", get(health))
    .route("/novel/register", post(services::novel::register_novel));

  let listener = tokio::net::TcpListener::bind("0.0.0.0:8000").await.unwrap();
  axum::serve(listener, app).await.unwrap();
}

async fn health() -> &'static str {
  "ok"
}
