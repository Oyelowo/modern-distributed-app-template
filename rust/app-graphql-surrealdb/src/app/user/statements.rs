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

pub enum Operator {
    GREATER_THAN,
    LESS_THAN,
    EQUAL_TO,
}

impl Operator {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Self::GREATER_THAN => write!(f, ">"),
            Self::LESS_THAN => write!(f, "<"),
            Self::EQUAL_TO => write!(f, "="),
        }
    }
}

impl std::fmt::Debug for Operator {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        Operator::fmt(self, f)
    }
}

impl std::fmt::Display for Operator {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        /*
         let sign = match self {
            Self::GREATER_THAN => ">",
            Self::LESS_THAN => "<",
        };
        f.write_str(sign)
         */
        Operator::fmt(self, f)
    }
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
    println!("{s}"); // prints "foo 1 bar 2"
}
