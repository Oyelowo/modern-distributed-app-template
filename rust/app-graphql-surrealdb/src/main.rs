use anyhow::Context;
use backoff::ExponentialBackoff;

use lib_common::middleware;

use lib_common::configurations::application::Environment;

use app_graphql_surrealdb::utils::graphql::{
    graphql_handler, graphql_handler_ws, graphql_playground, setup_graphql,
};
use backoff::future::retry;

use poem::{get, listener::TcpListener, middleware::Tracing, EndpointExt, Route, Server};
use surreal_rs::storage::Mem;
use surreal_rs::Surreal;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // let log_level = match &ApplicationConfigs::default().environment {
    //     Environment::Local => "debug",
    //     _ => "info",
    // };

    // std::env::set_var("RUST_LOG", log_level);
    std::env::set_var("RUST_LOG", "debug");
    // env_logger::init();
    // if std::env::var_os("RUST_LOG").is_none() {
    //     std::env::set_var("RUST_LOG", "poem=debug");
    // }
    tracing_subscriber::fmt::init();
    let backoff = ExponentialBackoff::default();

    let operation = || async { Ok(run_app().await?) };

    retry(backoff, operation).await
}

async fn run_app() -> anyhow::Result<()> {
    // let application = ApplicationConfigs::default();
    // let environment = application.clone().environment;
    let environment = Environment::Local;
    // let redis_config = RedisConfigs::default();

    let db = Surreal::connect::<Mem>(()).await?;

    db.use_ns("namespace").use_db("database").await?;

    // let redis = redis_config
    //     .clone()
    //     .get_client()
    //     .context("Problem getting redis")?;

    // let oauth_client = get_oauth_client(redis.clone());
    // let database = SurrealConfigs::default()
    //     .get_database()
    //     .context("Problem getting database")?;

    let app_url = "localhost:8000";
    // let app_url = &application.get_url();

    // let database = Arc::new(database);
    let schema = setup_graphql(db.clone(), &environment);

    let session = middleware::get_session_surreal_orm(db.clone(), &environment)
        .await
        .context("Problem getting session")?;

    let api_routes = Route::new()
        // .at("/healthz", get(healthz))
        // .at("/liveness", get(liveness))
        // .at("/oauth/signin/:oauth_provider", get(start_authentication))
        // .at("/oauth/callback", get(complete_authentication))
        .at("/graphql", get(graphql_playground).post(graphql_handler))
        .at("/graphql/ws", get(graphql_handler_ws));

    let api = Route::new()
        .nest("/api", api_routes)
        .data(schema)
        .data(db)
        // .data(redis)
        // .data(oauth_client)
        // Middlewares
        .with(middleware::get_cors(environment))
        .with(session)
        // .with(CookieSession::new(CookieConfig::default().secure(false)))
        // .with(Logger)
        .with(Tracing);

    log::info!("Playground: {app_url}");

    Server::new(TcpListener::bind(app_url))
        .run(api)
        .await
        .context("Problem running server")?;
    Ok(())
}

// fn _get_oauth_client(redis_client: redis::Client) -> OauthClient<RedisCache> {
//     let cache_storage = RedisCache::new(redis_client);
//     let base_url = ApplicationConfigs::default().external_base_url;
//     let redirect_url = format!("{base_url}/api/oauth/callback");
//     let github_creds = OauthGithubCredentials::default();

//     let google_creds = OauthGoogleCredentials::default();

//     let github = GithubConfig::new(redirect_url.clone(), github_creds);
//     let google = GoogleConfig::new(redirect_url, google_creds);

//     OauthClient::builder()
//         .github(github)
//         .google(google)
//         .cache_storage(cache_storage)
//         .build()
// }
