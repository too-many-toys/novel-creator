use axum::{
  body::Body,
  extract::rejection::JsonRejection,
  http::{Response, StatusCode},
  response::IntoResponse,
};
use thiserror::Error;

#[derive(Debug, Error)]
pub enum ServerError {
  #[error(transparent)]
  ValidationError(#[from] validator::ValidationErrors),

  #[error(transparent)]
  AxumJsonRejection(#[from] JsonRejection),
}

impl IntoResponse for ServerError {
  fn into_response(self) -> Response<Body> {
    match self {
      ServerError::ValidationError(_) => {
        let message = format!("Input validation error: [{self}]").replace('\n', ", ");
        (StatusCode::BAD_REQUEST, message)
      }
      ServerError::AxumJsonRejection(_) => (StatusCode::BAD_REQUEST, self.to_string()),
    }
    .into_response()
  }
}
