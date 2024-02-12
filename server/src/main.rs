use axum::{
  routing::{get, post},
  Router,
};

use server::context;
use server::handlers;
use tower_http::cors::{Any, CorsLayer};

#[tokio::main]
async fn main() {
  let app_state = context::init().await;

  let app = Router::new()
    .route("/health", get(health))
    // NOVEL ROUTER
    .route("/novel/:id", get(handlers::novel::get_novel))
    .route("/novels", get(handlers::novel::get_novels))
    .route("/novel/register", post(handlers::novel::create_novel))
    // USER ROUTER
    .route("/user/login", post(handlers::user::login))
    .layer(
      CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any),
      // "http://localhost:7357".parse::<HeaderValue>().unwrap(),
    )
    .with_state(app_state);

  let listener = tokio::net::TcpListener::bind("0.0.0.0:8000").await.unwrap();
  axum::serve(listener, app)
    // .with_graceful_shutdown(shutdown_signal())
    .await
    .unwrap();
}

async fn health() -> &'static str {
  "ok"
}

#[allow(dead_code)]
async fn shutdown_signal() {
  tokio::signal::ctrl_c()
    .await
    .expect("Expect shutdown signal handler");
  println!("Server Down")
}
