use axum::{
  extract::{Json, State},
  http::StatusCode,
};

use crate::{dto::user::UserLoginDto, utils::ValidatedJson};

pub async fn login(
  State(app_state): State<crate::context::AppState>,
  ValidatedJson(payload): ValidatedJson<UserLoginDto>,
) -> (StatusCode, Json<serde_json::Value>) {
  let user = app_state
    .user_repository
    .find_one_by_wallet_address(app_state.db.get_pool(), &payload.uid)
    .await;

  if let Err(e) = user {
    return (
      StatusCode::INTERNAL_SERVER_ERROR,
      Json(serde_json::json!({"error": e.to_string()})),
    );
  }
  if let None = user.unwrap() {
    let insert_result = app_state
      .user_repository
      .insert_one_only_wallet_address(app_state.db.get_pool(), &payload.uid)
      .await;
    if let Err(e) = insert_result {
      return (
        StatusCode::INTERNAL_SERVER_ERROR,
        Json(serde_json::json!({"error": e.to_string()})),
      );
    }
    return (StatusCode::CREATED, Json(serde_json::json!({})));
  }

  (StatusCode::OK, Json(serde_json::json!({})))
}
