use axum::{
  extract::{Json, Path, Query},
  http::StatusCode,
};
use std::collections::HashMap;

pub async fn register_novel(
  Json(payload): Json<HashMap<String, String>>,
) -> (StatusCode, Json<serde_json::Value>) {
  (StatusCode::CREATED, Json(serde_json::json!({})))
}
