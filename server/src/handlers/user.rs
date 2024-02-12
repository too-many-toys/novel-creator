use axum::{
  extract::{Json, State},
  http::StatusCode,
};

#[derive(serde::Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct UserLoginPayload {
  pub wallet_address: String,
}

pub async fn login(
  State(app_state): State<crate::context::AppState>,
  Json(payload): Json<UserLoginPayload>,
) -> (StatusCode, Json<serde_json::Value>) {
  tracing::info!("payload: {:?}", &payload);
  let user = app_state
    .user_repository
    .find_one_by_wallet_address(app_state.db.get_pool(), &payload.wallet_address)
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
      .insert_one_only_wallet_address(app_state.db.get_pool(), &payload.wallet_address)
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
