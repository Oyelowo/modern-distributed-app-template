use derive_more::Display;

macro_rules! sql {
    ($($x:ident),*) => {
        $(
            #[derive(Debug, Display)]
            pub struct $x;
        )*
    }
}

sql! {
    SELECT,
    FROM,
    WHERE,
    LIMIT,
    TIMEOUT
}

#[derive(Debug, Display)]
pub enum Ordering {
    ASC,
    DESC,
}

#[derive(Debug, Display)]
pub enum Logicals {
    AND,
    OR,
}

macro_rules! concat {
    ($($arg:tt)*) => {
        [$(stringify!($arg)),*].join("")
    }
}

macro_rules! my_format {
    ($($arg:tt)*) => {
        format!("{}", concat!($($arg)*))
    }
}


fn lowo() {
    let foo = 1;
    let bar = 2;
    let s = my_format!(foo $foo bar $bar);
    println!("{}", s); // prints "foo 1 bar 2"
}
