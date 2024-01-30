use axum::{
    routing::{get, post},
    Json, Router,
};

use server::config;

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();

    config::read_env();

    let app = Router::new().route("/health", get(health));

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

async fn health() -> &'static str {
    "ok"
}
