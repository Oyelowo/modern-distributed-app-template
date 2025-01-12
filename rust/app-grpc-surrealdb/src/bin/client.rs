use anyhow::Result;
use hello_world::{greeter_client::GreeterClient, HelloRequest};

pub mod hello_world {
    #![allow(clippy::derive_partial_eq_without_eq)]
    tonic::include_proto!("helloworld");
}

#[tokio::main]
async fn main() -> Result<()> {
    let mut client = GreeterClient::connect("http://[::1]:50051").await?;

    let request = tonic::Request::new(HelloRequest {
        name: "Tonic".into(),
    });

    let _response = client.say_hello(request).await?;

    Ok(())
}
