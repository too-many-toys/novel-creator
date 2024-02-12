use async_trait::async_trait;
use axum::{
  body::Body,
  extract::{rejection::FormRejection, FromRequest, Request},
  Json,
};
use serde::de::DeserializeOwned;
use validator::Validate;

pub mod error;

#[derive(Debug, Clone, Copy, Default)]
pub struct ValidatedJson<T>(pub T);

#[async_trait]
impl<T, S> FromRequest<S> for ValidatedJson<T>
where
  T: DeserializeOwned + Validate,
  S: Send + Sync,
  Json<T>: FromRequest<S, Rejection = FormRejection>,
{
  type Rejection = super::utils::error::ServerError;

  async fn from_request(req: Request<Body>, state: &S) -> Result<Self, Self::Rejection> {
    let Json(value) = Json::<T>::from_request(req, state).await?;
    value.validate()?;
    Ok(ValidatedJson(value))
  }
}
