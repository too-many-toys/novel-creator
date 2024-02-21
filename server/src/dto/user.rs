#[derive(serde::Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct UserLoginDto {
  pub wallet_address: Option<String>,
  pub access_token: String,
  pub uid: String,
}
