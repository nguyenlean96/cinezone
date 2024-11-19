use actix_files::{self as fs, NamedFile};
use actix_web::{get, middleware, post, web, App, HttpResponse, HttpServer, Responder};
use console::Style;
use std::path::PathBuf;

async fn single_page_app() -> actix_web::Result<NamedFile> {
    // 1.
    let path: PathBuf = PathBuf::from("./public/index.html");
    Ok(fs::NamedFile::open(path)?)
}

#[get("/")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hello world!")
}

#[post("/echo")]
async fn echo(req_body: String) -> impl Responder {
    HttpResponse::Ok().body(req_body)
}

async fn manual_hello() -> impl Responder {
    HttpResponse::Ok().body("Hey there!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    std::env::set_var("RUST_LOG", "actix_web=info");
    env_logger::init();

    HttpServer::new(|| {
        App::new()
            .wrap(middleware::Logger::default())
            .route("/", web::get().to(single_page_app))
            .route("/user", web::get().to(single_page_app))
            .service(fs::Files::new("/", "./public").index_file("index.html"))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}