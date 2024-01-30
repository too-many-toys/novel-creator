use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
pub struct UserModel {
  pub id: u32,
  pub name: String,
  pub pen_name: String,
  pub intro: String,
  pub uid: String,
  pub email: String,
  pub wallet_address: String,
  pub created_at: chrono::DateTime<chrono::Utc>,
  pub updated_at: chrono::DateTime<chrono::Utc>,
}
