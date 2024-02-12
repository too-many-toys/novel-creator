use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, Deserialize, Serialize, FromRow)]
#[serde(rename_all = "camelCase")]
pub struct UserModel {
  #[serde(skip_serializing_if = "Option::is_none")]
  pub id: Option<i32>,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub name: Option<String>,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub pen_name: Option<String>,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub intro: Option<String>,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub uid: Option<String>,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub email: Option<String>,
  pub wallet_address: String,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub created_at: Option<chrono::DateTime<chrono::Utc>>,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub updated_at: Option<chrono::DateTime<chrono::Utc>>,
}
