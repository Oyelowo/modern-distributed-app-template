use std::io::Error;

use async_trait::async_trait;
use poem::{Endpoint, Middleware, Request, Response};

// An example of implementing a custom middleware for poem.
struct Log;

impl<E: Endpoint> Middleware<E> for Log {
    type Output = LogImpl<E>;

    fn transform(&self, ep: E) -> Self::Output {
        LogImpl(ep)
    }
}

struct LogImpl<E>(E);

#[async_trait]
impl<E: Endpoint> Endpoint for LogImpl<E> {
    type Output = Response;

    async fn call(&self, req: Request) -> Result<Self::Output, Error> {
        dbg!("request: {}", req.uri().path());
        let res = self.0.call(req).await;

        match res {
            Ok(resp) => {
                let resp = resp.into_response();
                dbg!("response: {}", resp.status());
                Ok(resp)
            }
            Err(err) => {
                dbg!("error: {}", err);
                Err(err)
            }
        }
    }
}
