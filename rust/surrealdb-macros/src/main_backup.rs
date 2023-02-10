#![allow(dead_code)]
#![allow(non_upper_case_globals)]
#![allow(non_snake_case)]
#![allow(non_camel_case_types)]
#![allow(incomplete_features)]
#![allow(unused_imports)]
#![feature(inherent_associated_types)]
#![feature(generic_const_exprs)]

use _core::ops::{Deref, DerefMut};
use serde::{Deserialize, Serialize};
// #![feature(inherent_associated_types)]
// #![feature(const_mut_refs)]
// use serde::{Deserialize, Serialize};
// use surreal_simple_querybuilder::prelude::*;
use static_assertions::*;
use surrealdb::{
    engine::local::{Db, Mem},
    opt::IntoResource,
    sql::Id,
    Result, Surreal,
};
// const_assert!("oylelowo".as_str().len() > 3);
// assert_fields!(Account_Manage_Project: r#in, out);

// use surrealdb_macros::{
//     links::{LinkMany, LinkOne, LinkSelf, Relate},
//     model_id::SurId,
//     query_builder::{query, NodeBuilder, ToNodeBuilder},
//     Clause, SurrealdbEdge, /* SurrealdbEdge, */ SurrealdbNode,
// };
// use surrealdb_macros::{
//     links::{LinkMany, LinkOne, LinkSelf, Relate},
//     model_id::SurIdComplex,
//     node_builder::{NodeBuilder as NodeBuilder2, ToNodeBuilder as ToNodeBuilder2},
//     query_builder::{query, ToNodeBuilder},
//     Edge, SurrealdbModel,
// };
use typed_builder::TypedBuilder;

#[derive(/* SurrealdbModel */ Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Account {
    id: Option<String>,
    handle: String,
    // #[urrealdb(rename = "nawao")]
    first_name: String,
    // #[surrealdb(link_self = "Account", skip_serializing)]
    // best_friend: LinkSelf<Account>,

    // #[surrealdb(link_self = "Account", skip_serializing)]
    // teacher: LinkSelf<Account>,

    // #[surrealdb(rename = "lastName")]
    another_name: String,
    chess: String,
    nice_poa: String,
    password: String,
    email: String,
    // #[surrealdb(relate(edge="Account_Manage_Project", description="->manage->Account"))]
    // #[surrealdb(relate(edge = "AccountManageProject", link = "->manage->Project"))]
    // managed_projects: Relate<Project>,
}

#[derive(Serialize, Deserialize, Debug)]
#[surrealdb(rename_all = "camelCase")]
pub struct Project {
    id: Option<String>,
    title: String,
    // #[surrealdbrelate = "->run_by->Account")]
    // #[surrealdb(relate(edge = "AccountManageProject", link = "<-manage<-Account"))]
    // account: Relate<Account>,
}

// #[derive(Debug, Serialize, Deserialize, Default)]
#[derive(Debug, Serialize, Deserialize)]
#[surrealdb(relation_name = "manage")]
struct AccountManageProject {
    id: Option<String>,
    // #[surrealdb(link_one = "Account", skip_serializing)]
    // #[serde(rename = "in")]
    // _in: LinkOne<Account>,
    // r#in: LinkOne<Account>,
    // #[surrealdb(link_one = "Project", skip_serializing)]
    // out: LinkOne<Project>,
    when: String,
    destination: String,
}

#[derive(TypedBuilder, Serialize, Deserialize, Debug, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Student {
    #[serde(skip_serializing_if = "Option::is_none")]
    #[builder(default, setter(strip_option))]
    id: Option<String>,
    first_name: String,

    #[surrealdb(link_one = "Course", skip_serializing)]
    course: LinkOne<Course>,

    #[surrealdb(link_many = "Course", skip_serializing)]
    #[serde(rename = "lowo")]
    all_semester_courses: LinkMany<Course>,

    #[surrealdb(relate(edge = "StudentWritesBlog", link = "->writes->Blog"))]
    written_blogs: Relate<Blog>,
}

impl Student {
    fn relate_writes_blog() -> String {
        Student::get_schema()
            .writtenBlogs
            .as_alias(Student::get_schema().writtenBlogs().to_string().as_str())
    }
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[surrealdb(relation_name = "writes")]
struct StudentWritesBlog {
    id: Option<String>,
    #[surrealdb(link_one = "Student")]
    r#in: LinkOne<Student>,
    #[surrealdb(link_one = "Blog")]
    out: LinkOne<Blog>,
    when: String,
    destination: String,
}

#[derive(TypedBuilder, Default, Serialize, Deserialize, Debug, Clone)]
#[surrealdb(rename_all = "camelCase")]
pub struct Blog {
    #[serde(skip_serializing_if = "Option::is_none")]
    #[builder(default, setter(strip_option))]
    id: Option<String>,
    title: String,
    #[serde(skip_serializing)]
    content: String,
}

#[derive(TypedBuilder, Default, Serialize, Deserialize, Debug, Clone)]
#[surrealdb(rename_all = "camelCase")]
pub struct Course {
    #[serde(skip_serializing_if = "Option::is_none")]
    #[builder(default, setter(strip_option))]
    id: Option<String>,
    title: String,
}

::static_assertions::assert_type_eq_all!(LinkOne<Course>, LinkOne<Course>);

// use ref_mod::Ref;
// use ref_mod::{LinkMany, Ref as Mana};

static DB: Surreal<Db> = Surreal::init();

#[tokio::main]
async fn idea_main1() -> Result<()> {
    let xx = Blog {
        id: None,
        title: "lowo".to_string(),
        content: "nama".to_string(),
    };
    println!("mowo {}", serde_json::to_string(&xx).unwrap());

    
    let m = query()
        .select(Student::relate_writes_blog())
        // .select(Student::get_schema().writtenBlogs.as_alias("writtenBlogs"))
        .from(Student::get_schema())
        .build();

    println!("moam {}", m);
    // DB.connect::<Mem>(()).await?;
    // DB.use_ns("namespace").use_db("database").await?;
    //
    // let c = Course::builder()
    //     // .id(Some("Course:math".into()))
    //     .title("Calculuse".into())
    //     .build();
    // let cx: Course = DB.create("Course").content(&c).await.unwrap();
    // println!("cxxxx.....{:?}", cx);
    // let id = Id::from("Course:math");
    // // let idr = id.to_raw();
    //
    // let cs: Option<Course> = DB
    //     .select(SurIdComplex::from_string(cx.clone().id.unwrap()))
    //     // .select(SurIdComplex(("Course".to_string(), cx.id.unwrap()).0))
    //     .await
    //     .unwrap();
    //
    // // let cx: Course = DB.create(("Course", &*"meth")).content(&c).await.unwrap();
    // println!("cssss.....{:?}", cx);
    // // let cf: Foreign<Course> = Foreign::new_value(cx);
    // // let cf = Ref::from_model(cs.clone().unwrap());
    // // let cf1 = Ref::from_model(cs.clone().unwrap());
    // // let cf2 = Ref::from_model(cs.unwrap());
    // // let cf = Ref::Id(cs.unwrap().id.unwrap().into());
    // let cfake = Course::builder()
    //     .id("Course:math".into())
    //     .title("Calculuse".into())
    //     .build();
    //
    // // println!(
    // //     "cours {}",
    // //     serde_json::to_string(&cf.value().unwrap().id).unwrap()
    // // );
    //
    // let cxx = cs.as_ref().unwrap();
    // // let cxx = &cs.unwrap();
    // let stu = Student::builder()
    //     .first_name("dayo".into())
    //     .course(cxx.into())
    //     .all_semester_courses(vec![cxx.into(), cxx.into(), cfake.into()])
    //     .build();
    //
    // let stud1: Student = DB.create("Student").content(&stu).await.unwrap();
    // println!("stud1: stud1 {:?}", stud1);
    // // stud1.course.allow_value_serialize();
    // println!(
    //     "stud1_serjson: stud1serj {}",
    //     serde_json::to_string(&stud1).unwrap()
    // );
    //
    // let stud_select: Option<Student> = DB
    //     .select(SurIdComplex::from_string(stud1.clone().id.unwrap()))
    //     // .select(SurIdComplex(("Course".to_string(), cx.id.unwrap()).0))
    //     .await
    //     .unwrap();
    //
    // let sql_query = query()
    //     .select("*")
    //     .from(stud_select.unwrap().clone().id.unwrap())
    //     // .from(stud1.clone().id.unwrap())
    //     .fetch_many(&[
    //         Student::get_schema().course.identifier,
    //         Student::get_schema().lowo.identifier,
    //         // "allSemesterCourses",
    //     ])
    //     .build();
    // println!("SQL {sql_query}");
    // let mut sql_q_result = DB.query(sql_query).await.unwrap();
    // let sql_q: Option<Student> = sql_q_result.take(0)?;
    //
    // let mmm = sql_q.clone().unwrap().clone().course.value_ref();
    // println!("sqllll {:?}", sql_q);
    // // println!("studselect1: studselect1 {:?}", stud_select);
    // // sql_q
    // //     .clone()
    // //     .unwrap()
    // //     .clone()
    // //     .course
    // //     .allow_value_serialize();
    // // stud_select.clone().unwrap().course.allow_value_serialize();
    // println!(
    //     "stud SELECT_serjson: rj {}",
    //     serde_json::to_string(&sql_q).unwrap()
    // );
    //
    // println!("relate...{}", Student::get_schema().firstName);
    // // cxxxx.....Course { id: Some("Course:ygz4r9w68lls6e9k8fo5"), title: "Calculuse" }
    Ok(())
}
mod schema {
    use serde::Serialize;
    use std::fmt::{Debug, Display};
    use surrealdb_macros::{
        node_builder::{NodeBuilder as NodeBuilder2, ToNodeBuilder as ToNodeBuilder2},
        query_builder::query,
    };

    use crate::schema::{
        book_schema::Book,
        student_schema::{Student, StudentEnum},
    };

    #[derive(Serialize, Debug, Default)]
    pub struct DbField(String);

    impl DbField {
        pub fn push_str(&mut self, string: &str) {
            self.0.push_str(string)
        }

        pub fn __as__(&self, alias: impl std::fmt::Display) -> String {
            // let xx = self.___________store;
            format!("{self} AS {alias}")
        }
    }

    impl From<String> for DbField {
        fn from(value: String) -> Self {
            Self(value.into())
        }
    }
    impl From<&str> for DbField {
        fn from(value: &str) -> Self {
            Self(value.into())
        }
    }
    impl From<DbField> for String {
        fn from(value: DbField) -> Self {
            value.0
        }
    }

    impl Display for DbField {
        fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
            f.write_fmt(format_args!("{}", self.0))
        }
    }

    /* impl std::fmt::Debug for DbField {
        fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
            f.write_fmt(format_args!("{}", self.0))
        }
    } */

    impl ToNodeBuilder2 for DbField {}

    // let x = DbField("lowo".into());
    struct Foreign {}
    // For e.g: ->writes->Book as field_name_as_alias_default

    pub enum Clause {
        None,
        Where(String),
        // Change to SurId
        Id(String),
    }
    mod student_schema {
        use serde::Serialize;

        use super::{
            blog_schema::Blog, book_schema::Book, juice_schema::Juice, water_schema::Water,
            /* writes_schema::Writes, */ Clause, *,
        };

        #[derive(Debug, Serialize, Default)]
        pub struct Student {
            pub id: DbField,
            pub name: DbField,
            // favorite_course_mate: Student
            // favorite_course_mate: Student,
            // favorite_book: Book
            pub favorite_book: DbField,
            // ->writes->book
            pub book_written: DbField,
            // ->writes->blog
            pub blog_written: DbField,
            // ->drinks->water
            pub drunk_water: DbField,
            // ->drinks->juice
            pub drunk_juice: DbField,
            pub ___________store: String,
        }

        impl Display for Student {
            fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
                f.write_fmt(format_args!("{}", self.___________store))
            }
        }

        type Writes = super::writes_schema::Writes<Student>;

        impl Writes {
            pub fn book(&self, clause: Clause) -> Book {
                let mut xx = Book::default();
                xx.__________store.push_str(self.__________store.as_str());
                let pp = format_clause(clause, "book");

                xx.__________store.push_str(format!("book{pp}").as_str());

                xx
            }

            pub fn blog(&self, clause: Clause) -> Blog {
                let mut xx = Blog::default();
                xx.______________store
                    .push_str(self.__________store.as_str());
                let pp = format_clause(clause, "blog");
                xx.______________store
                    .push_str(format!("blog{pp}").as_str());

                xx.intro.push_str(xx.______________store.as_str());
                xx.intro.push_str(".intro");
                xx
            }
        }

        #[derive(Debug)]
        pub enum StudentEnum {
            book_written,
            blog_written,
            drunk_water,
            drunk_juice,
        }

        impl Display for StudentEnum {
            fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
                match self {
                    StudentEnum::book_written => f.write_str("book_written"),
                    StudentEnum::blog_written => f.write_str("blog_written "),
                    StudentEnum::drunk_water => f.write_str("drunk_water "),
                    StudentEnum::drunk_juice => f.write_str("drunk_juice "),
                }
            }
        }

        impl Student {
            pub const book_written: &'static str = "book_written";
            pub type Aliases = StudentEnum;

            pub fn __with_id__(id: impl std::fmt::Display) -> Self {
                let mut stud_model = Self::traverse();
                stud_model
                    .___________store
                    .push_str(id.to_string().as_str());
                stud_model
            }

            pub fn __with__(db_name: impl std::fmt::Display) -> Self {
                let mut stud_model = Self::traverse();
                stud_model
                    .___________store
                    .push_str(db_name.to_string().as_str());
                stud_model
            }

            pub fn traverse() -> Self {
                Self {
                    id: "id".into(),
                    name: "foreign".into(),
                    favorite_book: "favorite_book".into(),
                    blog_written: "blog_written".into(),
                    book_written: "book_written".into(),
                    drunk_water: "drunk_water".into(),
                    drunk_juice: "drunk_juice".into(),
                    ___________store: "".to_string(),
                }
            }

            pub fn __________update_connection(store: &String, clause: Clause) -> Student {
                let mut xx = Student::default();
                let connection = format!("{}student{}", store, format_clause(clause, "student"));

                xx.___________store.push_str(connection.as_str());

                xx.drunk_water
                    .push_str(format!("{}.drunk_water", xx.___________store).as_str());
                xx.favorite_book
                    .push_str(format!("{}.favorite_book", xx.___________store).as_str());
                xx
            }

            pub fn writes__(&self, clause: Clause) -> Writes {
                let xx = Writes::__________update_edge_right(&self.___________store, clause);
                xx
            }

            pub fn drinks__(&self, clause: Clause) -> Drinks {
                let mut xx = Drinks::default();
                xx.__________store.push_str(self.___________store.as_str());
                let pp = format_clause(clause, "drinks");
                xx.__________store
                    .push_str(format!("->drinks{pp}->").as_str());
                xx
            }

            pub fn favorite_book(&self, clause: Clause) -> Book {
                let mut xx = Book::default();
                xx.__________store.push_str(self.___________store.as_str());
                xx.title.0.push_str(self.___________store.as_str());
                let pp = format_clause(clause, "book");
                // xx.title.push_str("lxxtitle");
                xx.__________store
                    .push_str(format!("favorite_book{pp}").as_str());
                xx.title
                    .0
                    .push_str(format!("favorite_book{pp}.title").as_str());
                xx
            }

            // Aliases
            pub fn __as__(&self, alias: impl std::fmt::Display) -> String {
                // let xx = self.___________store;
                format!("{self} AS {alias}")
            }
            /// Returns the   as book written   of this [`Student`].
            /// AS book_written
            pub fn __as_book_written__(&self) -> String {
                // let xx = self.___________store;
                format!("{self} AS book_written")
            }
            pub fn __as_blog_written__(&self) -> String {
                // let xx = self.___________store;
                format!("{self} AS blog_written")
            }
            pub fn __as_drunk_juice__(&self) -> String {
                // let xx = self.___________store;
                format!("{self} AS drunk_juice")
            }
            pub fn __as_drunk_water__(&self) -> String {
                // let xx = self.___________store;
                format!("{self} AS drunk_water")
            }
        }

        #[derive(Debug, Default)]
        pub struct Drinks {
            pub id: String,
            pub r#in: String,
            pub out: String,
            pub rate: String,
            __________store: String,
        }

        impl Drinks {
            pub fn new() -> Self {
                Self {
                    id: "id".into(),
                    r#in: "in".into(),
                    out: "out".into(),
                    rate: "time_written".into(),
                    __________store: "".into(),
                }
            }

            pub fn water(&self, clause: Clause) -> Water {
                let mut xx = Water::default();
                xx.______________store
                    .push_str(self.__________store.as_str());
                let pp = format_clause(clause, "water");
                xx.______________store
                    .push_str(format!("water{pp}").as_str());

                xx
            }
            pub fn juice(&self, clause: Clause) -> Juice {
                let mut xx = Juice::default();
                xx.______________store
                    .push_str(self.__________store.as_str());
                let pp = format_clause(clause, "juice");
                xx.______________store
                    .push_str(format!("juice{pp}").as_str());

                xx.flavor.push_str(xx.______________store.as_str());
                xx.flavor.push_str(".flavor");
                xx.maker.push_str(xx.______________store.as_str());
                xx.maker.push_str(".maker");
                xx
            }
        }
    }
    pub fn format_clause(clause: Clause, table_name: &'static str) -> String {
        let pp = match clause {
            Clause::None => "".into(),
            Clause::Where(where_clause) => {
                if !where_clause.to_lowercase().starts_with("where") {
                    panic!("Invalid where clause, must start with `WHERE`")
                }
                format!("[{where_clause}]")
            }
            Clause::Id(id) => {
                if !id
                    // .to_lowercase()
                    .starts_with(format!("{table_name}:").as_str())
                {
                    // let xx = format!("invalid id {id}. Id does not belong to table {table_name}")
                    //     .as_str();
                    panic!("invalid id {id}. Id does not belong to table {table_name}")
                }
                format!("[WHERE id = {id}]")
            }
        };
        pp
    }

    mod writes_schema {
        use std::marker::PhantomData;

        use serde::Serialize;

        use super::{
            blog_schema::Blog, book_schema::Book, format_clause, student_schema::Student, Clause,
            DbField,
        };

        #[derive(Debug, Default)]
        pub struct Writes<Model: Serialize + Default> {
            id: DbField,
            // Student, User
            // Even though it's possible to have full object when in and out are loaded,
            // in practise, we almost never want to do this, since edges are rarely
            // accessed directly but only via nodes and they are more like bridges
            // between two nodes. So, we make that trade-off of only allowing DbField
            // - which is just a surrealdb id , for both in and out nodes.
            // Still, we can get access to in and out nodes via the origin and destination nodes
            // e.g User->Eats->Food. We can get User and Food without accessing Eats directly.
            r#in: DbField,
            // Book, Blog
            pub out: DbField,
            pub time_written: DbField,
            pub when: DbField,
            pub pattern: DbField,
            pub __________store: String,
            ___________model: PhantomData<Model>,
            // ___________outer: PhantomData<Out>,
        }

        impl<Model: Serialize + Default> Writes<Model> {
            pub fn new() -> Self {
                Self {
                    id: "id".into(),
                    r#in: "in".into(),
                    out: "out".into(),
                    when: "when".into(),
                    pattern: "pattern".into(),
                    time_written: "time_written".into(),
                    __________store: "".into(),
                    ___________model: PhantomData,
                    // ___________outer: PhantomData,
                }
            }

            pub fn __________update_edge_right(
                // writes_store: &String,
                store: &String,
                clause: Clause,
            ) -> Writes<Model> {
                let mut xx = Writes::<Model>::default();
                let connection = format!(
                    "{}->writes{}->",
                    store.as_str(),
                    format_clause(clause, "writes")
                );
                xx.__________store.push_str(connection.as_str());

                let store_without_end_arrow = xx.__________store.trim_end_matches("->");
                xx.time_written
                    .push_str(format!("{}.time_written", store_without_end_arrow).as_str());
                xx.pattern
                    .push_str(format!("{}.pattern", store_without_end_arrow).as_str());
                xx
            }

            pub fn __________update_edge_left(store: &String, clause: Clause) -> Writes<Model> {
                // let mut xx = Writes::default();
                let mut schema_instance = Writes::<Model>::default();
                let connection = format!("{}<-writes{}<-", store, format_clause(clause, "writes"));

                schema_instance
                    .__________store
                    .push_str(connection.as_str());

                let store_without_end_arrow =
                    schema_instance.__________store.trim_end_matches("<-");

                schema_instance
                    .time_written
                    .push_str(format!("{}.time_written", store_without_end_arrow).as_str());
                schema_instance
                    .pattern
                    .push_str(format!("{}.pattern", store_without_end_arrow).as_str());
                schema_instance
            }
        }
    }
    struct Cond(String);

    impl ::std::fmt::Display for Cond {
        fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
            f.write_fmt(format_args!("{}", self.0))
        }
    }
    mod blog_schema {
        use std::fmt::Display;

        use super::DbField;
        use surrealdb_macros::{
            node_builder::{NodeBuilder as NodeBuilder2, ToNodeBuilder as ToNodeBuilder2},
            query_builder::query,
        };

        #[derive(Debug, Default)]
        pub struct Blog {
            pub id: DbField,
            pub intro: DbField,
            pub poster: DbField,
            pub comments: DbField,
            pub ______________store: String,
        }

        impl Display for Blog {
            fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
                f.write_fmt(format_args!("{}", self.______________store))
            }
        }

        /* impl ToNodeBuilder2 for Blog {
            // add code here
        } */
    }
    mod water_schema {
        use super::DbField;

        #[derive(Debug, Default)]
        pub struct Water {
            pub id: DbField,
            pub source: DbField,
            pub river: DbField,
            pub ______________store: String,
        }
    }
    mod juice_schema {
        use std::fmt::Display;

        use super::DbField;

        #[derive(Debug, Default)]
        pub struct Juice {
            pub id: DbField,
            pub maker: DbField,
            pub flavor: DbField,
            pub ______________store: String,
        }

        impl Display for Juice {
            fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
                f.write_fmt(format_args!("{}", self.______________store))
            }
        }

        impl Juice {
            pub fn __as__(&self, alias: impl std::fmt::Display) -> String {
                format!("{self} AS {alias}")
            }
        }
    }
    mod book_schema {
        use serde::Serialize;
        use surrealdb_macros::

        use super::{
            blog_schema::Blog, student_schema::Student, /* writes_schema::Writes, */ Clause, *,
        };

        #[derive(Serialize, Debug, Default)]
        pub struct Book {
            pub id: DbField,
            pub title: DbField,
            pub page_count: DbField,
            // <-writes<-Student
            pub writer: DbField,
            chapters: DbField,
            pub __________store: String,
        }

        impl Display for Book {
            fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
                f.write_fmt(format_args!("{}", self.__________store))
            }
        }
        // #[derive(Serialize, Default)]
        // pub struct WritesBook(String);

        type Writes = super::writes_schema::Writes<Book>;
        impl Writes {
            pub fn student(&self, clause: Clause) -> Student {
                Student::__________update_connection(&self.__________store, clause)
            }
        }

        impl Book {
            pub fn traverse() -> Self {
                Self {
                    __________store: "".to_string(),
                    ..Default::default()
                }
            }

            pub fn __with__(db_name: impl std::fmt::Display) -> Self {
                let mut stud_model = Self::traverse();
                stud_model
                    .__________store
                    .push_str(db_name.to_string().as_str());
                stud_model
            }

            pub fn __with_id__(mut self, id: impl std::fmt::Display) -> Self {
                // TODO: Remove prefix book, so that its not bookBook:lowo
                self.__________store.push_str(id.to_string().as_str());
                self
            }
            /// .
            pub fn __writes(&self, clause: Clause) -> Writes {
                Writes::__________update_edge_left(&self.__________store, clause)
            }

            pub fn __done__(self) -> String {
                self.__________store.clone()
            }
        }
    }

    mod chapters_schema {
        use super::DbField;

        #[derive(Debug, Default)]
        struct Chapters {
            id: DbField,
            verse: DbField,
            __________store: String,
            // writer: Relate,
        }
    }
    pub fn nama() {
        // Student::new().book_written().chapters().verse
        // DbField("df".into())
        // "".contains_not()
        // let rela = Student::new()
        //     .book_written_cond(Cond("WHERE pages > 5".into()))
        //     .writer();
        // println!("rela...{:?}", rela.store);

        let rela = student_schema::Student::traverse()
            .writes__(Clause::Where(
                query()
                    .and_where("pages > 5")
                    .and("time_done = yesterday")
                    .build(),
            ))
            .book(Clause::Id("book:akkaka".into()))
            .__writes(Clause::None)
            .student(Clause::Id("student:lowo".into()))
            .writes__(Clause::None)
            .book(Clause::None)
            .__writes(Clause::None)
            .student(Clause::None)
            .drinks__(Clause::None)
            .juice(Clause::None)
            .__as__("kula");

        println!("rela...{:?}", rela);

        let rela = student_schema::Student::traverse()
            .writes__(Clause::Where(
                query()
                    .and_where("pages > 5")
                    .and("time_done = yesterday")
                    .build(),
            ))
            .book(Clause::Id("book:akkaka".into()))
            .__writes(Clause::Id("writes:pram".into()))
            .time_written
            .__as__("xxx");
        // .student(Clause::None)
        // .drunk_water
        // .__as__("wara");
        // .__as__(Student::book_written);
        // .blog(Clause::Id("blog:akkaka".into()));
        // .as_alias(Blog)
        // .intro
        // .__as__("dfdf");

        println!("rela...{}", rela);

        // Student.favorite_book.title
        let rela = student_schema::Student::traverse()
            .favorite_book(Clause::Id("book:janta".into()))
            .title;
        println!("rela...{}", rela);

        // println!("rela...{}", StudentEnum::book_written);
        let rela = student_schema::Student::__with_id__("Student:lowo")
            .writes__(Clause::None)
            .book(Clause::None)
            .__with_id__("Book:maow");
        println!("rela...{}", rela);
    }
}
// impl Book {
//     fn writer(&self) -> Student {
//         todo!()
//     }
// }
// Student->writes->Book->has->Chaper
// let rela = Student::new().book_written().chapters();
// // ->writes->Book->
// let xx = Student::new()
//     .book_written()
//     .writer()
//     .book_written()
//     .writer()
//     .book_written()
//     .writer()
//     .book_written();

#[tokio::main]
async fn main() {
    // let xx =S
    schema::nama();
}

pub struct Tests<In: Serialize, Out: Serialize> {
    id: String,
    _in: In,
    out: Out,
    time_written: String,
}

impl<In: Serialize, Out: Serialize> Tests<In, Out> {
    pub fn mki(&self) {}
}

// mod xx {
#[derive(Serialize)]
struct UserTests(String);

type TimoChecker = Tests<UserTests, UserTests>;
trait Fighter {
    type In;
}

#[derive(Serialize)]
struct Lowo;

#[derive(Serialize)]
struct Dayo;
type LowoTestsDayo = Tests<Lowo, Dayo>;

impl Fighter for LowoTestsDayo {
    type In = Lowo;
}
::static_assertions::assert_type_eq_all!(Lowo, <LowoTestsDayo as Fighter>::In);

type Timo = Tests<UserTests, UserTests>;
impl Timo {
    fn do_it(&self) {
        // Tim();
        println!("holla");
    }
}
// }

#[derive(Serialize)]
struct PersonTests(String);

type Mana = Tests<PersonTests, PersonTests>;
impl Mana {
    fn do_it(&self) {
        println!("holla");
    }
}
// LET $from = (SELECT users FROM company:surrealdb);
// LET $devs = (SELECT * FROM user WHERE tags CONTAINS 'developer');
// RELATE $from->like->$devs SET time.connected = time::now();
// struct Company {
//   users: LinkMany<User>
// }
//
// struct User {
//     tags: Vec<String>,
//     company: LinkOne<Company>,
//     companies: LinkMany<Company>,
// }
// RELATE User[where company.id == company:surrealdb]->like->User[where tags contains 'developer']
//
//
/* #[derive(SurrealdbModel, TypedBuilder, Serialize, Deserialize, Debug, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Student {
    #[serde(skip_serializing_if = "Option::is_none")]
    #[builder(default, setter(strip_option))]
    id: Option<String>,
    first_name: String,

    #[surrealdb(link_one = "Course", skip_serializing)]
    course: LinkOne<Course>,

    #[surrealdb(link_many = "Course", skip_serializing)]
    #[serde(rename = "lowo")]
    all_semester_courses: LinkMany<Course>,

    #[surrealdb(relate(edge = "StudentWritesBlog", link = "->writes->Blog"))]
    written_blogs: Relate<Blog>,
} */
// Account::with_id(SuId(""))

/*
========RELATE===========
 * -- Add a graph edge between two specific records
RELATE user:tobie->write->article:surreal SET time.written = time::now();

-- Add a graph edge between multiple specific users and devs
LET $from = (SELECT users FROM company:surrealdb);
LET $devs = (SELECT * FROM user WHERE tags CONTAINS 'developer');
RELATE $from->like->$devs SET time.connected = time::now();/

RELATE user:tobie->write->article:surreal CONTENT {
    source: 'Apple notes',
    tags: ['notes', 'markdown'],
    time: {
        written: time::now(),
    },
};

========SELECT===========
-- Select a remote field from connected out graph edges
SELECT ->like->friend.name AS friends FROM person:tobie;


-- Conditional filtering based on graph edges
SELECT * FROM profile WHERE count(->experience->organisation) > 3;

SELECT * FROM person WHERE ->knows->person->(knows WHERE influencer = true) TIMEOUT 5s;
PREFERRED: SELECT * FROM person WHERE ->knows[WHERE influencer = true]->person

#[derive(SurrealdbModel, TypedBuilder, Serialize, Deserialize, Debug, Clone)]
#[serde(rename_all = "camelCase")]
struct Person {
    #[surrealdb(relate(edge = "PersonKnowsPerson", link = "->knows->Person"))]
   known_persons: Relate<Person>
}

#[derive(SurrealdbModel, Debug, Serialize, Deserialize)]
#[surrealdb(relation_name = "knows")]
struct PersonKnowsPerson {
    id: Option<String>,
    #[surrealdb(link_one = "Person", skip_serializing)]
    r#in: LinkOne<Person>,
    #[surrealdb(link_one = "Person", skip_serializing)]
    out: LinkOne<Person>,
    influencer: bool,
}

SELECT ->purchased->product<-purchased<-person->purchased->product FROM person:tobie PARALLEL;


========DELETE===========
// DELETE person WHERE ->knows->person->(knows WHERE influencer = false) TIMEOUT 5s;

========UPDATE===========
// UPDATE person SET important = true WHERE ->knows->person->(knows WHERE influencer = true) TIMEOUT 5s;
// PREFERRED: UPDATE person SET important = true WHERE ->knows->person[WHERE influencer = true] TIMEOUT 5s;
*/