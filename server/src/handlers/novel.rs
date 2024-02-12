use axum::{
  debug_handler,
  extract::{Json, Path, State},
  http::StatusCode,
};

use crate::{
  dto::novel::CreateNovelDto, model::novel::NovelModel, repository::novel::FindAllOptions,
  utils::ValidatedJson,
};

#[debug_handler(state = crate::context::AppState)]
pub async fn create_novel(
  State(app_state): State<crate::context::AppState>,
  ValidatedJson(payload): ValidatedJson<CreateNovelDto>,
) -> (StatusCode, Json<serde_json::Value>) {
  let novel = app_state
    .novel_repository
    .find_one_by_title(app_state.db.get_pool(), payload.title.to_owned())
    .await;
  if let Err(e) = novel {
    return (
      StatusCode::INTERNAL_SERVER_ERROR,
      Json(serde_json::json!({"error": e.to_string()})),
    );
  };
  if let Some(_) = novel.unwrap() {
    return (
      StatusCode::BAD_REQUEST,
      Json(serde_json::json!({"error": "Novel already exists"})),
    );
  };

  let novel_model = NovelModel {
    title: payload.title.to_owned(),
    description: payload.description.to_owned(),
    ..Default::default()
  };
  tracing::info!("Creating novel: {:?}", novel_model);
  // let novel = app_state
  //   .novel_repository
  //   .insert_one(app_state.db.get_pool(), &novel_model)
  //   .await;

  // if let Err(e) = novel {
  //   return (
  //     StatusCode::INTERNAL_SERVER_ERROR,
  //     Json(serde_json::json!({"error": e.to_string()})),
  //   );
  // }
  (StatusCode::CREATED, Json(serde_json::json!({})))
}

pub async fn get_novel(
  State(app_state): State<crate::context::AppState>,
  Path(id): Path<i32>,
) -> (StatusCode, Json<serde_json::Value>) {
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

  (
    StatusCode::OK,
    Json(serde_json::json!({"novel": novel.unwrap()})),
  )
}

pub async fn get_novels(
  State(app_state): State<crate::context::AppState>,
) -> (StatusCode, Json<serde_json::Value>) {
  let novels = app_state
    .novel_repository
    .find_all(
      app_state.db.get_pool(),
      Some(FindAllOptions {
        limit: 10,
        offset: 0,
      }),
    )
    .await;
  if let Err(e) = novels {
    return (
      StatusCode::INTERNAL_SERVER_ERROR,
      Json(serde_json::json!({"error": e.to_string()})),
    );
  }

  (
    StatusCode::OK,
    Json(serde_json::json!({"novels": novels.unwrap()})),
  )
}
