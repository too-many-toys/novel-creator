pub mod novel;

pub trait FindOne {
  async fn find_one(&self, id: i32);
}

pub trait Insert<T> {
  async fn insert(&self, data: &T);
}
