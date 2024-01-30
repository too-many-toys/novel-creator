use dotenv::dotenv;

pub fn read_env() {
    dotenv().ok();
}
