use super::{FindOne, Insert};
use sqlx::query;

use crate::model::novel::NovelModel;

pub struct NovelRepository {}

impl NovelRepository {}

impl FindOne for NovelRepository {
  async fn find_one(&self, id: i32) {}
}

impl<T> Insert<T> for NovelRepository {
  async fn insert(&self, data: &T) {}
}
