use axum::{
  extract::{Json, Path, State},
  http::StatusCode,
};

use crate::model::novel::NovelModel;

pub async fn create_novel(
  State(app_state): State<crate::context::AppState>,
  Json(payload): Json<NovelModel>,
) -> (StatusCode, Json<serde_json::Value>) {
  tracing::info!("create_novel: {:?}", payload);
  let novel = app_state
    .novel_repository
    .insert_one(app_state.db.get_pool(), &payload)
    .await;
  tracing::info!("create_novel: {:?}", payload);

  if let Err(e) = novel {
    return (
      StatusCode::INTERNAL_SERVER_ERROR,
      Json(serde_json::json!({"error": e.to_string()})),
    );
  }
  (StatusCode::CREATED, Json(serde_json::json!({})))
}

pub async fn get_novel(
  State(app_state): State<crate::context::AppState>,
  Path(id): Path<i32>,
) -> (StatusCode, Json<serde_json::Value>) {
  tracing::info!("get_novel: id={}", id);
  let novel = app_state
    .novel_repository
    .find_one_by_id(app_state.db.get_pool(), id as i32)
    .await;
  if let Err(e) = novel {
    return (
      StatusCode::INTERNAL_SERVER_ERROR,
      Json(serde_json::json!({"error": e.to_string()})),
    );
  }

  tracing::info!("get_novel: novel={:?}", novel);

  (StatusCode::OK, Json(serde_json::json!({})))
}
