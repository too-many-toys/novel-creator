use serde::{Deserialize, Serialize};
use validator::Validate;

#[derive(Debug, Deserialize, Serialize, Validate)]
pub struct CreateNovelDto {
  #[validate(length(min = 1, message = "Can not be empty"))]
  pub title: String,
  #[validate(length(min = 1, message = "Can not be empty"))]
  pub description: String,
  #[validate(length(min = 1, message = "Can not be empty"))]
  pub signature: String,

  #[serde(skip_serializing_if = "Option::is_none")]
  pub tags: Option<Vec<String>>,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub genres: Option<String>,

  #[serde(skip_serializing_if = "Option::is_none")]
  pub image_url: Option<String>,
}
